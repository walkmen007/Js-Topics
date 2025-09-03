

// Ques: 1: Find the Kth Largest Integer in the Array
// links: https://leetcode.com/problems/kth-largest-element-in-an-array/description/

var findKthLargest = function(nums, k) {
  nums.sort((a,b)=>{
    if(a.length !== b.length){
        return b.length - a.length
    }

    if (a>b) return -1;
    if (a<b) return 1;
    return 0;
  });
    return nums[k-1];
};
// Time Complexity: O(n log n)
// Space Complexity: O(n)


var kthLargestNumber = function(nums, k) {
  // Compare two numeric strings by value (without converting to Number)
function greater(a, b) {
  if (a.length !== b.length) return a.length > b.length; // longer -> larger
  return a > b; // same length -> lexicographic equals numeric comparison
}

function partition(left, right, pivotIndex) {
  const pivot = nums[pivotIndex];
  // move pivot to end
  [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
  let store = left;
  for (let i = left; i < right; i++) {
    if (greater(nums[i], pivot)) {      // place "greater than pivot" to the left
      [nums[i], nums[store]] = [nums[store], nums[i]];
      store++;
    }
  }
  // place pivot in its final spot
  [nums[store], nums[right]] = [nums[right], nums[store]];
  return store;
}

const target = k - 1; // we arrange in descending order, so kth largest is index k-1
let left = 0, right = nums.length - 1;

while (left <= right) {
  const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left; // randomized pivot
  const idx = partition(left, right, pivotIndex);
  if (idx === target) return nums[idx];
  if (idx < target) left = idx + 1; else right = idx - 1;
}
};

// Time Complexity: O(n)
// Space Complexity: O(1)

