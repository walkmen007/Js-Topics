//Question 1: Maximum Points You Can Obtain from Cards
// links: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

var maxScore = function(cardPoints, k) {
    const n = cardPoints.length;
    const sum = cardPoints.reduce((a, b) => a + b , 0);

    if (k == 0) return 0;
    if (k === n) return sum;

    const windowSize = n-k; 

    let windowSum = 0;
    // initial window [0, windowSize)
    for (let i =0; i< windowSize; i++) windowSum+= cardPoints[i];

    let minWindowSum = windowSum;

    // Slide the window to right

    for (let j = windowSize; j< n; j++) {
        windowSum+= cardPoints[j] - cardPoints[j-windowSize];
        minWindowSum = Math.min(windowSum, minWindowSum)
    }

    return sum - minWindowSum;
};  


//Question 2: Maximum Average Subarray I
// links: https://leetcode.com/problems/maximum-average-subarray-i/description/

var findMaxAverage = function(nums, k) {
    const n = nums.length;
    if (k=== 0) return 0;
    if (k === n) return (nums.reduce((a, b) => a + b, 0) / n);

    let sum = 0;
    for (let i =0; i< k; i++) {
        sum += nums[i]
    }
    let maxSum = sum;

    for (let j =k; j < n; j++) {
        sum += nums[j] - nums[j-k];    // add new, remove old
        maxSum = Math.max(sum, maxSum)
    }

    return maxSum/k
};


// Question: 3 Minimum Size Subarray Sum (variable size Sliding Window)
// links: https://leetcode.com/problems/minimum-size-subarray-sum/description/
// 1. Maintain a sliding window with two pointers (left, right).
// 2. Expand right to grow the window until the sum ≥ target.
// 3. Once valid, try to shrink from the left to find the minimal length.
// 4. Keep track of the minimum length across all valid windows.

var minSubArrayLen = function(target, nums) {
    const n = nums.length;

    const totalSum = nums.reduce((a , b) => a + b, 0);

    if (totalSum < target) return 0;
    if (totalSum == target) return n;

    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right =0; right < n; right++) {
        sum += nums[right];

        // shrink window while condition is satisfied
        while (sum >= target) {
            sum -= nums[left];
            minLength = Math.min(minLength, (right - left + 1))
            left++
        }
    }

    return minLength;
};

// Question 4: Longest Substring Without Repeating Characters (Sliding Window + Hash Map Approach)
// links: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
// * Use two pointers: left and right → define the current window.
// * Use a hash map (or Set) to store characters in the current window.
// * Expand right to include new characters.
// * If a character repeats, shrink the window from the left until the duplicate is removed.
// * Track the maximum window length.


var lengthOfLongestSubstring = function(s) {
    const n = s.length;
    let left = 0;
    let visited = new Map();
    let maxLen = 0;

    for (let right = 0; right < n; right++) {
        let char = s[right];
        // If char already seen and inside the current window, move left
        if (visited.has(char) && visited.get(char) >= left) {
            left = visited.get(char) + 1
        }
        visited.set(char, right)
        maxLen = Math.max(maxLen, right- left + 1)
    }
    return maxLen;
};


// Question 5: Longest Repeating Character Replacement (Sliding Window)
// links: https://leetcode.com/problems/longest-repeating-character-replacement/description/


var characterReplacement = function(s, k) {
  const charCount = new Array(26).fill(0);
  let maxLength = 0;
  let maxCount = 0;
  let start = 0;
  for (let i=0; i < s.length; i++) {
      const charIndex = s.charCodeAt(i) - 'A'.charCodeAt(0);
      charCount[charIndex]++;
      maxCount = Math.max(maxCount, charCount[charIndex]); // Update maxCount
      // If the length of the current window minus maxCount is greater than k,
      // then we need to shrink the window from the left
      if (i - start + 1 - maxCount > k) {
          const startCharIndex = s.charCodeAt(start) - 'A'.charCodeAt(0);
          charCount[startCharIndex]--; // Decrement count for the character going out of the window
          start++; // Move the start pointer to the right
      }

      // Update maxLength with the current window size
      maxLength = Math.max(maxLength, i - start + 1);
  }
  return maxLength;
};



var checkInclusion = function(s1, s2) {
  let n = s1.length, m = s2.length;
  if (n > m) return false;

  let count1 = new Array(26).fill(0);
  let count2 = new Array(26).fill(0);

  const aCode = 'a'.charCodeAt(0);

  // fill counts for s1 and first window in s2
  for (let i =0; i< n; i++) {
      count1[s1.charCodeAt(i) - aCode]++
      count2[s2.charCodeAt(i) - aCode]++
  }

  if (count1.join() == count2.join()) return true;

 // slide the window
  for (j = n; j < m; j++) {
      count2[s2.charCodeAt(j) - aCode]++; // add new char
      count2[s2.charCodeAt(j - n) - aCode]--;  // remove new char


      if (count1.join() == count2.join()) return true;
  }

  return false;
};

// Question 6:  Permutation in String (Sliding Window + Frequency Count Approach)
// links: https://leetcode.com/problems/permutation-in-string/description/

// * A permutation of s1 means a substring of length len(s1) with the same character counts.
// * Use two frequency arrays/maps:
//     * count1 → frequency of chars in s1.
//     * count2 → frequency of chars in the current window of s2.
// * Slide a window of length len(s1) across s2.
// * If at any point count1 === count2, return true.

var checkInclusion = function(s1, s2) {
  if(s1.length > s2.length) return false;

  let s1Map = new Array(26).fill(0);
  let s2Map = new Array(26).fill(0);
 let aCharCode = 'a'.charCodeAt(0);

  for(let i=0;i<s1.length;i++){
      s1Map[s1.charCodeAt(i) - aCharCode]++;
      s2Map[s2.charCodeAt(i) - aCharCode]++;
  }


  let left = 0;

  for(let i=s1.length;i<s2.length;i++){
      if(checkEqual(s1Map, s2Map)) return true;
      s2Map[s2.charCodeAt(i) - aCharCode]++;
      s2Map[s2.charCodeAt(left) - aCharCode]--;
      left++;
  }

 return checkEqual(s1Map, s2Map);
};

const checkEqual = (s1, s2) =>{
  for(let i=0;i<26;i++){
      if(s1[i]!== s2[i]) return false
  }
  return true;
}

// Another approach to the same problem
var checkInclusion = function(s1, s2) {
  let n = s1.length, m = s2.length;
  if (n > m) return false;

  let count1 = new Array(26).fill(0);
  let count2 = new Array(26).fill(0);

  const aCode = 'a'.charCodeAt(0);

  // fill counts for s1 and first window in s2
  for (let i =0; i< n; i++) {
      count1[s1.charCodeAt(i) - aCode]++
      count2[s2.charCodeAt(i) - aCode]++
  }

  if (count1.join() == count2.join()) return true;

 // slide the window
  for (j = n; j < m; j++) {
      count2[s2.charCodeAt(j) - aCode]++; // add new char
      count2[s2.charCodeAt(j - n) - aCode]--;  // remove new char


      if (count1.join() == count2.join()) return true;
  }

  return false;
};


// Question 7:  Find All Anagrams in a String
// links: https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
// * Use two frequency arrays/maps:
//     * count1 → frequency of chars in s1.
// *     * count2 → frequency of chars in the current window of s2.
// * Slide a window of length len(s1) across s2.
// * If at any point count1 === count2, return true.


var findAnagrams = function(s, p) {
    let n = s.length, m = p.length;

    if (n < m) return [];

    let count1 = new Array(26).fill(0);
    let count2 = new Array(26).fill(0);

    const aCode = 'a'.charCodeAt(0);
    let result = []
    // fill counts for p and first window in s
    for (let i =0; i< m; i++) {
        count1[p.charCodeAt(i) - aCode]++
        count2[s.charCodeAt(i) - aCode]++
    }

    if (checkEqual(count1, count2)) result.push(0);

    let left = 0;
    for (let j = m; j < n; j++) {
        count2[s.charCodeAt(j) - aCode]++;
        count2[s.charCodeAt(left) - aCode]--;
        
        if (checkEqual(count1, count2)) result.push(left+1);
        left++;
    }

    return result;
};

const checkEqual = (s1, s2) =>{
    for(let i=0;i<26;i++){
        if(s1[i]!== s2[i]) return false
    }
    return true;
}


// Question 8: Fruit Into Baskets(Longest Substring with at most 2 distinct characters)
// links: https://leetcode.com/problems/fruit-into-baskets/description/
// 1. Use a map (or object) to store counts of fruits in the current window.
// 2. Expand the right pointer → add fruit.
// 3. If more than 2 types in map → shrink from left until ≤ 2 types.
// 4. Track the maximum window size.


var totalFruit = function(fruits) {
    let n = fruits.length;
    let left = 0;
    let map = new Map();
    let maxLen = 0;

    for (let right = 0; right < n; right++) {
        map.set(fruits[right], (map.get(fruits[right]) || 0) + 1);

         // Shrink window if more than 2 fruit types
         if (map.size > 2) {
            map.set(fruits[left], map.get(fruits[left]) - 1);
            if (map.get(fruits[left]) === 0) {
                map.delete(fruits[left]);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;

};

// Question 9  Maximum Sum of Distinct Subarrays With Length K
// links: https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/description/
// 1. Maintain a sliding window of size k.
// 2. Use a Map/Set to track distinct elements in the current window.
// 3. Keep the current sum of the window.
// 4. When window reaches size k:
// 5. If window elements are distinct → update result with current sum.
// 6. Then slide the window forward (remove left element, add right element).


var maximumSubarraySum = function(nums, k) {
    const n = nums.length;
    if (n < k) return 0;

    let maxSum = 0;
    let currSum = 0;

    let left =0;
    let map = new Map();
    for (let right = 0; right < n; right++) {
        map.set(nums[right], (map.get(nums[right]) || 0) + 1);
        currSum += nums[right];
        
        // Maintain window of size k
        if (right - left + 1 > k) {
            let leftNum = nums[left];
            currSum -= leftNum;
            map.set(leftNum, map.get(leftNum) - 1);
            if (map.get(leftNum) === 0) map.delete(leftNum);
            left++;
        }
        
         // Check if window is valid
        if (right - left + 1 === k && map.size === k) {
            maxSum = Math.max(maxSum, currSum);
        } 
    }
    return maxSum
};


// Question 10: Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
// links: https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/
// Approach: Sliding Window (Fixed Size)
// 1. Compute sum of the first k elements.
// 2. If average ≥ threshold → increment count.
// 3. Slide the window across the array:
//     * Subtract the element leaving the window.
//     * Add the new element entering.
//     * Check average again.
// 4. Return count.


var numOfSubarrays = function(arr, k, threshold) {
    const n = arr.length;
    if (k=== 0) return 0;

    let maxAvg =0;
    let sum = 0;
    let count = 0;
    for (let i =0; i< k; i++) {
        sum += arr[i];
    }
    if (sum/k >= threshold) {
            count++;
        }
    let left = 0;

    for (let j = k; j< n; j++) {
        
        sum += arr[j] - arr[j-k];    // add new, remove old
        if (sum/k >= threshold) {
            count++;
        }
    }
    return count
};

// question 11: Find subarray with k distinct elements and print sum
// Find all subarrays that contain exactly k distinct elements

// Print their sum
// links: https://leetcode.com/problems/find-subarray-with-given-sum/description/
// Approach (Sliding Window + HashMap)

// Use a sliding window to track distinct elements.

// Expand right pointer, add elements into a map (count).

// Shrink left pointer if distinct elements exceed k.

// Whenever distinct count = k, record that subarray’s sum.

function subarraysWithKDistinctSum(arr, k) {
  let result = [];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let set = new Set();
    let sum = 0;
    for (let j = i; j < n; j++) {
      set.add(arr[j]);
      sum += arr[j];

      if (set.size === k) {
        result.push(sum);
      } else if (set.size > k) {
        break; // too many distinct, stop extending
      }
    }
  }
  return result;
}
