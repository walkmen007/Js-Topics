$ What is circuit break pattern?

# What problem does a Circuit Breaker solve?

Services calling other services (HTTP, GRPC, DB, caches, queues) can suffer from slow responses or failures. If callers keep waiting or retrying, they can consume resources and cascade failure through your system.
A **circuit breaker** prevents that cascade by *failing fast* when a downstream dependency is unhealthy, giving it time to recover and freeing up client resources.

# Concept & States

Classic circuit breaker has three states:

* **Closed** — calls are allowed. The breaker records successes/failures.
* **Open** — calls are immediately failed (or a fallback used) without calling downstream. This prevents load on the failing dependency.
* **Half-Open** — after a timeout, a limited number of trial calls are allowed. If they succeed, the breaker moves to Closed; if they fail, it re-opens.

# Key config parameters

* **timeout**: max allowed time for a single call before treating it as a failure. (Set relative to p95/p99 of the dependency.)
* **failure threshold**: how many failures (or what error percentage within a window) triggers open state (e.g., 50% errors over last N requests, or 5 consecutive failures).
* **rolling window / sample size**: over what time or number of requests you measure failures.
* **reset timeout (open duration)**: how long to stay open before trying half-open.
* **success threshold in half-open**: how many successful trial calls are needed to close again.
* **fallback**: optional immediate fallback behavior (cached result, default response, user-friendly error).

# Failure detection strategies

* **Consecutive failures** (simple): e.g., open after N consecutive failures.
* **Error percentage over rolling window**: better for variable traffic — open when error% > X over last Y requests or time window.
* **Timeouts count as failures** — always treat exceeded timeouts as failures.

# Where to put the breaker

* **Client-side** (recommended): each service has a local breaker protecting calls it makes. Low latency to check, simple.
* **Centralized / gateway**: API gateway can act as a shared breaker for many clients (useful for external dependencies).
* **Distributed circuit breaking** (global state across many nodes) is possible but adds complexity (consensus/state store) and can lead to coordination issues; use only if you truly need a global view.

# Relationship to other patterns

* **Bulkhead** — isolate resources (thread pools, connection pools) so one failure doesn’t exhaust all resources.
* **Retry with backoff** — use retries carefully; combine them with circuit breaker to avoid overwhelming a failing service.
* **Rate limiting** / **Backpressure** — complement breakers for overload protection.

---

# Simple homegrown Circuit Breaker in Node.js

This is a minimal but practical implementation you can use or adapt. It supports timeouts, consecutive/rolling-failure thresholds, open/half-open/closed, fallback, and emits events.

```js
// circuit-breaker.js
const EventEmitter = require('events');

class CircuitBreaker extends EventEmitter {
  constructor(action, options = {}) {
    super();
    this.action = action; // async function to protect
    this.timeout = options.timeout ?? 2000; // ms
    this.failureThreshold = options.failureThreshold ?? 5; // failures to open
    this.successThreshold = options.successThreshold ?? 2; // successes to close from half-open
    this.resetTimeout = options.resetTimeout ?? 10000; // ms to move from open -> half-open
    this.strategy = options.strategy ?? 'consecutive'; // or 'rolling'
    // rolling window bookkeeping (timestamps)
    this.rollingWindow = options.rollingWindow ?? 10000; // ms
    this.maxWindowFailures = options.maxWindowFailures ?? 5;

    this.state = 'CLOSED';
    this.consecFailures = 0;
    this.consecSuccesses = 0;
    this.failures = []; // timestamps for rolling strategy
    this._nextAttemptTimer = null;
  }

  _now() { return Date.now(); }

  _recordFailure() {
    this.consecFailures++;
    this.consecSuccesses = 0;
    if (this.strategy === 'rolling') {
      const ts = this._now();
      this.failures.push(ts);
      // drop old
      const cutoff = ts - this.rollingWindow;
      this.failures = this.failures.filter(t => t >= cutoff);
      if (this.failures.length >= this.maxWindowFailures) {
        this._open();
      }
    } else {
      if (this.consecFailures >= this.failureThreshold) this._open();
    }
  }

  _recordSuccess() {
    this.consecFailures = 0;
    if (this.state === 'HALF_OPEN') {
      this.consecSuccesses++;
      if (this.consecSuccesses >= this.successThreshold) {
        this._close();
      }
    }
  }

  _open() {
    if (this.state === 'OPEN') return;
    this.state = 'OPEN';
    this.emit('open');
    // schedule half-open trial
    clearTimeout(this._nextAttemptTimer);
    this._nextAttemptTimer = setTimeout(() => {
      this.state = 'HALF_OPEN';
      this.consecSuccesses = 0;
      this.emit('halfOpen');
    }, this.resetTimeout);
  }

  _close() {
    this.state = 'CLOSED';
    this.consecFailures = 0;
    this.failures = [];
    this.emit('close');
  }

  async fire(...args) {
    if (this.state === 'OPEN') {
      const err = new Error('Circuit is open');
      err.code = 'EOPEN';
      throw err;
    }

    // race action against timeout
    const actionPromise = (async () => {
      try {
        const result = await this.action(...args);
        this._recordSuccess();
        return result;
      } catch (e) {
        this._recordFailure();
        throw e;
      }
    })();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        const err = new Error('Timeout');
        err.code = 'ETIMEOUT';
        reject(err);
      }, this.timeout)
    );

    return Promise.race([actionPromise, timeoutPromise]);
  }

  // optional synchronous fallback for immediate response
  async callWithFallback(args, fallback) {
    try {
      return await this.fire(...args);
    } catch (err) {
      if (fallback) return fallback(err, ...args);
      throw err;
    }
  }
}

module.exports = CircuitBreaker;
```

Usage example (with axios):

```js
const axios = require('axios');
const CircuitBreaker = require('./circuit-breaker');

const callUserService = async (id) => {
  const res = await axios.get(`http://usersvc/users/${id}`, { timeout: 1500 });
  return res.data;
};

const breaker = new CircuitBreaker(callUserService, {
  timeout: 2000,
  failureThreshold: 4,
  resetTimeout: 15000,
  strategy: 'rolling',
  rollingWindow: 10000,
  maxWindowFailures: 4
});

breaker.on('open', () => console.warn('CB opened'));
breaker.on('halfOpen', () => console.info('CB half-open'));
breaker.on('close', () => console.info('CB closed'));

// Use:
(async () => {
  try {
    const user = await breaker.fire(123);
    console.log(user);
  } catch (err) {
    // fallback or transform
    console.error('Call failed / circuit open', err.message);
  }
})();
```

This simple implementation is good for learning and small services. For production you may prefer a battle-tested library.

---

# Using a battle-tested library (example: `opossum`)

`opossum` is a popular Node.js circuit breaker library (lightweight + featureful). Example usage:

```js
const CircuitBreaker = require('opossum');
const axios = require('axios');

async function getProfile(userId) {
  const r = await axios.get(`http://usersvc/users/${userId}`, { timeout: 1500 });
  return r.data;
}

const options = {
  timeout: 2000, // If function takes longer, it fails
  errorThresholdPercentage: 50, // % of failures to open
  resetTimeout: 10000, // ms before trying again
  rollingCountTimeout: 10000,
  rollingCountBuckets: 10
};

const breaker = new CircuitBreaker(getProfile, options);

breaker.fallback((userId, err) => {
  // cached value or graceful message
  return { id: userId, name: 'Guest (fallback)', fallback: true };
});

breaker.on('open', () => console.warn('breaker opened!'));
breaker.on('halfOpen', () => console.info('breaker half-open'));
breaker.on('close', () => console.info('breaker closed'));

// call:
breaker.fire(123).then(console.log).catch(err => console.error('failed', err.message));
```

`opossum` supports events, metrics hooks, and more. (If you use TypeScript, type definitions are available.)

---

# Integrating with Observability & Metrics

* Emit events/stats for: calls, successes, failures, timeouts, opens, closes, half-open.
* Expose Prometheus metrics (counter, gauge, histogram): e.g., `cb_open_total`, `cb_failure_total`, `cb_success_total`, `cb_state{state="open"} 1/0`.
* Add tracing: propagate the current request/saga ID into the downstream call so traces reflect when circuit was tripped.
* Logging: include circuit state and reason (timeout vs HTTP 5xx) in logs.

Example (pseudo) for Prometheus:

```js
// prom-client example (simplified)
const { Counter, Gauge } = require('prom-client');
const cbOpenGauge = new Gauge({ name: 'circuit_open', help: 'Circuit open=1' });
breaker.on('open', () => cbOpenGauge.set(1));
breaker.on('close', () => cbOpenGauge.set(0));
```

---

# Testing and verification

* Unit test the breaker state transitions (closed -> open -> half-open -> closed).
* Integration test with a mock downstream that returns 500 or sleeps to simulate timeouts.
* Chaos testing: temporarily make downstream slow/unavailable and check that the breaker opens and recovers.
* Ensure your fallback is tested and correct.

---

# Operational guidance & recommended defaults

* **Timeout** = slightly higher than the dependency's typical p95 latency (e.g., p95 \* 1.5). Don’t set it ridiculously high.
* **Error threshold** = 50% is common; adjust based on traffic and tolerance.
* **Reset timeout** = start with 10–30s. Too short: too many retries; too long: delays recovery.
* Use **rolling window** metrics rather than simple counters in noisy workloads.
* Prefer **at-least-once** behavior in breakers (treat retries as separate attempts), but be careful with side effects — ensure idempotency where necessary.

---

# Common pitfalls

* **No timeouts**: if you don’t time out calls, the breaker can’t learn and can’t protect you.
* **Retries without breakers**: retries can make spikes worse — combine retries with exponential backoff and a circuit breaker.
* **Blocking the event loop**: Node timeouts should never block event loop; keep timeouts per-call.
* **Ignoring idempotency**: retries and half-open trial requests may cause duplicate side-effects — make operations idempotent where possible (idempotency keys).
* **Poor metrics/visibility**: if you can’t see when/why breakers open, it’s hard to diagnose cascading problems.

---

# When you should use a circuit breaker

* Calling remote services that can fail or become slow (internal/external HTTP APIs, databases/services with resource limits).
* Calls that have high latency variance or unstable availability.
* When protecting scarce resources (connection pools, threads).

# When you might skip it

* Local in-process calls that are cheap and always available.
* When you already have robust upstream rate limiting and bulkheads and the dependency is extremely stable.

---

# TL;DR — Practical checklist

1. Add per-client circuit breakers (or a gateway-level breaker for external APIs).
2. Always set a sensible **timeout**, treat timeouts as failures.
3. Use **error percentage over a rolling window** or **consecutive failures** to trip.
4. Provide a **fallback** (cache, default, helpful error).
5. Emit metrics (`open`, `close`, `failure`, `success`) and integrate with tracing.
6. Combine with retries (with exponential backoff), bulkheads, and rate-limiting.
7. Test with simulated failures and monitor production behaviour.


