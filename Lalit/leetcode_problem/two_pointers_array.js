//4Sum
// links: https://leetcode.com/problems/4sum/description/
// 1. Sort the array.
// 2. Use four pointers: i, j, left, right.
// 3. Fix i and j, and use two pointers to find the other two numbers.
// 4. If the sum of the four numbers is equal to the target, add it to the result.
// 5. If the sum is less than the target, move the left pointer to the right.
// 6. If the sum is greater than the target, move the right pointer to the left.

var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b); 
  const res = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;  // skip duplicate first values

      for (let j = i+1; j < n -2; j++) {
          if (j > i+1 && nums[j] === nums[j - 1]) continue;  // skip duplicate second values

          let left = j+1, right = n - 1;

          while (left < right) {
              let sum = nums[i] + nums[j] + nums[left] + nums[right];

              if (sum === target) {
                  res.push([nums[i] , nums[j] , nums[left] , nums[right]])

                  //skip duplicate third values
                  while (left < right && nums[left] === nums[left + 1]) left++;
                  // skip duplicate fourth values
                  while (left < right && nums[right] === nums[right - 1]) right--;

                  left++;
                  right--;
              } else if (sum < target) {
                  left++;
              } else {
                  right--;
              }
          }
      }
  }
  return res;
};


// Another Approach:
// k-Sum can be solved by fixing one number, then reducing the problem to (k-1)-Sum.

// Base case: when k == 2, solve it with the two-pointer technique.


var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b);

  return kSum(nums, target, 4)
};

function kSum(nums, target, k, start = 0) {
  const res = [];

  // Base case: 2-Sum with two pointers
  if (k === 2) {
      let left = start, right = nums.length- 1;

      while (left < right) {
          const sum = nums[left] + nums[right];
          if (sum === target) {
              res.push([nums[left] , nums[right]]);

              // skip duplicates
              while (left < right && nums[left] === nums[left + 1]) left++;
              while (left < right && nums[right] === nums[right - 1]) right--;
              left++;
              right--;
          }else if (sum < target) {
              left++;
          } else {
              right--;
          }
      }
      return res;
  }

  // recursive case: reduce k-Sum to (k-1)-Sum

  for (let i = start; i< nums.length - k + 1; i++) {
      if (i > start && nums[i] === nums[i-1]) continue;  // skip duplicates

      const subRes = kSum(nums, target-nums[i], k-1, i+1)

      for (const subset of subRes) {
          res.push([nums[i], ...subset]);
      }
  }

  return res;
}