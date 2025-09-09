const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  // add password/tls/cluster for production
});

// Basic in-memory fallback store (Map of key -> array of timestamps in ms)
const memStore = new Map();

function inMemorySlidingConsume(key, limit, windowMs) {
  const now = Date.now();
  const arr = memStore.get(key) || [];
  // remove old
  const cutoff = now - windowMs;
  let i = 0;
  while (i < arr.length && arr[i] <= cutoff) i++;
  const newArr = arr.slice(i);
  // add this request
  newArr.push(now);
  // store back
  memStore.set(key, newArr);
  const count = newArr.length;
  if (count > limit) {
    // find earliest in window to compute retry
    const earliest = newArr[0];
    const retryMs = Math.max(0, windowMs - (now - earliest));
    return { ok: false, remaining: 0, retryMs };
  } else {
    return { ok: true, remaining: limit - count, retryMs: 0 };
  }
}

/**
 * options:
 *  - windowMs: window size in ms (default 60000)
 *  - limit: max requests in window (default 60)
 *  - keyExtractor(req): returns string key (default: user:id -> x-api-key -> ip)
 *  - redisClient: optional override
 */
function makeSlidingRateLimiter(options = {}) {
  const windowMs = options.windowMs || 60 * 1000;
  const limit = options.limit || 60;
  const keyExtractor = options.keyExtractor || ((req) => {
    const userId = req.user && req.user.id;
    const apiKey = req.headers['x-api-key'];
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
    if (userId) return `user:${userId}`;
    if (apiKey) return `key:${apiKey}`;
    return `ip:${ip || 'unknown'}`;
  });
  const client = options.redisClient || redis;

  return async function slidingLimiter(req, res, next) {
    const redisKey = `rl:${keyExtractor(req)}`;
    const now = Date.now();
    const member = `${now}-${Math.random().toString(36).slice(2,9)}`;
    const windowStart = now - windowMs;

    try {
      // pipeline: ZADD, ZREMRANGEBYSCORE (old ones), ZCOUNT (in window), PEXPIRE
      const p = client.pipeline();
      p.zadd(redisKey, now, member);
      p.zremrangebyscore(redisKey, 0, windowStart); // remove items older than windowStart
      p.zcount(redisKey, windowStart, now);
      p.pexpire(redisKey, windowMs + 1000); // keep key around a bit
      const results = await p.exec();
      // results is array of [err, result]; index 2 => zcount result
      const zcountRes = results[2];
      if (zcountRes[0]) throw zcountRes[0]; // if error
      const count = Number(zcountRes[1]);

      if (count > limit) {
        // Over limit - remove our member (cleanup) and compute Retry-After
        await client.zrem(redisKey, member).catch(() => {});
        // Find earliest element's score (oldest within window) to compute retry
        const earliest = await client.zrange(redisKey, 0, 0, 'WITHSCORES');
        let retryMs = windowMs; // fallback
        if (earliest && earliest.length === 2) {
          const earliestScore = Number(earliest[1]);
          retryMs = Math.max(0, windowMs - (now - earliestScore));
        }
        const retrySec = Math.ceil(retryMs / 1000);
        res.set('Retry-After', String(retrySec));
        res.set('X-RateLimit-Limit', String(limit));
        res.set('X-RateLimit-Remaining', '0');
        const resetAt = Math.ceil((now + retryMs) / 1000);
        res.set('X-RateLimit-Reset', String(resetAt));
        return res.status(429).json({ error: 'Too Many Requests', retry_after_seconds: retrySec });
      } else {
        // allowed
        res.set('X-RateLimit-Limit', String(limit));
        res.set('X-RateLimit-Remaining', String(Math.max(0, limit - count)));
        res.set('X-RateLimit-Reset', String(Math.ceil((now + windowMs) / 1000)));
        return next();
      }
    } catch (err) {
      // Redis error -> fallback to in-memory sliding window (best-effort fail-open)
      console.warn('Redis error in rate limiter, falling back to memory:', err && err.message);
      const rr = inMemorySlidingConsume(redisKey, limit, windowMs);
      if (rr.ok) {
        res.set('X-RateLimit-Limit', String(limit));
        res.set('X-RateLimit-Remaining', String(rr.remaining));
        res.set('X-RateLimit-Reset', String(Math.ceil((Date.now() + windowMs) / 1000)));
        return next();
      } else {
        const retrySec = Math.ceil(rr.retryMs / 1000);
        res.set('Retry-After', String(retrySec));
        res.set('X-RateLimit-Limit', String(limit));
        res.set('X-RateLimit-Remaining', '0');
        return res.status(429).json({ error: 'Too Many Requests', retry_after_seconds: retrySec });
      }
    }
  };
}

module.exports = { makeSlidingRateLimiter, redis };




// rateLimiter.js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redis1 = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  // add password, tls, cluster settings in prod
});

const limiterByUser = new RateLimiterRedis({
  storeClient: redis1,
  keyPrefix: 'rl_user',
  points: 100,       // 100 requests
  duration: 60,      // per 60 seconds
});

const limiterByIp = new RateLimiterRedis({
  storeClient: redis1,
  keyPrefix: 'rl_ip',
  points: 20,        // 20 requests
  duration: 60,      // per 60 seconds
});

module.exports = function rateLimiterMiddleware(req, res, next) {
  // extract key: prefer authenticated user id > api key > ip
  const userId = req.user && req.user.id;
  const apiKey = req.headers['x-api-key'];
  const ip = (req.headers['x-forwarded-for'] || req.ip).split(',')[0].trim();

  // choose priority limiter
  const key = userId ? `user:${userId}` : apiKey ? `key:${apiKey}` : `ip:${ip}`;
  const limiter = userId || apiKey ? limiterByUser : limiterByIp;

  limiter.consume(key, 1)
    .then((rateRes) => {
      // rateRes.remainingPoints and msBeforeNext are available
      res.set('X-RateLimit-Limit', limiter.points); // optional: expose config
      res.set('X-RateLimit-Remaining', Math.max(0, rateRes.remainingPoints));
      // Reset as epoch seconds (approx)
      const resetSeconds = Math.ceil(Date.now()/1000 + (rateRes.msBeforeNext || 0)/1000);
      res.set('X-RateLimit-Reset', String(resetSeconds));
      next();
    })
    .catch((rej) => {
      // rejected: rate limited
      const retrySec = Math.ceil((rej.msBeforeNext || 1000) / 1000);
      res.set('Retry-After', String(retrySec));
      res.set('X-RateLimit-Limit', limiter.points);
      res.set('X-RateLimit-Remaining', '0');
      res.status(429).json({ error: 'Too Many Requests', retry_after_seconds: retrySec });
    });
};
