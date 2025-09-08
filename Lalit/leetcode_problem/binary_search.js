//Binary Search problem


//Question: Binary Search
// links: https://leetcode.com/problems/binary-search/description/


var search = function(nums, target) {
    const n = nums.length;

    let left = 0, right = n-1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] == target) return mid;

        if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
};


//Question: Median of Two Sorted Arrays
// links: https://leetcode.com/problems/median-of-two-sorted-arrays/description/
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.


var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1); // ensure nums1 is smaller
    }

    let m = nums1.length, n = nums2.length;
    let total = m + n;
    let half = Math.floor((total + 1) / 2);

    let left = 0, right = m;

    while (left <= right) {
        let i = Math.floor((left + right) / 2); // partition in nums1
        let j = half - i; // partition in nums2

        let left1 = (i > 0) ? nums1[i - 1] : -Infinity;
        let right1 = (i < m) ? nums1[i] : Infinity;

        let left2 = (j > 0) ? nums2[j - 1] : -Infinity;
        let right2 = (j < n) ? nums2[j] : Infinity;

        if (left1 <= right2 && left2 <= right1) {
            // found correct partition
            if (total % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            } else {
                return Math.max(left1, left2);
            }
        } else if (left1 > right2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
};




//Question 3 Search Insert Position
// links: https://leetcode.com/problems/search-insert-position/description/

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.


var searchInsert = function(nums, target) {
    if (nums.length == 1) {
        if (nums[0] == target) {
            return 0
        } else if (nums[0] > target) {
            return 0;
        } else return 1
    }
    let left = 0, right= nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        if (nums[mid] > target) {
            right = mid -1;
        } else {
            left = mid + 1;
        }
    }
    return left;
};

//Question 4: First Bad Version
// links: https://leetcode.com/problems/first-bad-version/description/


var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left =1, right = n;
        while (left < right) {
            const mid = Math.floor((left +right)/2);
            if (isBadVersion(mid)) {
                right = mid;  // mid could be the first bad
            } else {
                left = mid + 1    // first bad must be after mid
            }
        }

        return left;
    };
};

//Question 5: Find First and Last Position of Element in Sorted Array
// links: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

var searchRange = function(nums, target) {

    function findBound(isFirst) {
        let l = 0, r= nums.length-1, bound = -1;

        while(l <= r) {
            const mid = Math.floor((l+r)/2);
            if (nums[mid] === target) {
                bound = mid;
                if (isFirst) {
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
            else if (nums[mid] < target) {
                l = mid + 1
            } else {
                r = mid -1
            }
        }
        return bound
    }

    let first = findBound(true);
    let last = findBound(false);

    return [first, last];
};


//Question 6: Sqrt(x)
// links: https://leetcode.com/problems/sqrtx/description/


var mySqrt = function(x) {
    if (x < 2) return x;

    let left =1, right = Math.floor(x/2), answer = 1;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let sq = mid * mid;
        if (sq === x) {
            return mid
        } else if (sq < x) {
            answer = mid;
            left = mid+1
        } else {
            right = mid - 1
        }
    }
    return answer;
};


//Question 7: Valid Perfect Square
// links: https://leetcode.com/problems/valid-perfect-square/description/

var isPerfectSquare = function(num) {
    if (num == 1) return true;
    let left =1, right = Math.floor(num/2);

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let sq = mid * mid;
        if (sq === num) {
            return true
        } else if (sq < num) {
            left = mid+1
        } else {
            right = mid - 1
        }
    }
    return false;
};

//Question 8: Search in Rotated Sorted Array
// links: https://leetcode.com/problems/search-in-rotated-sorted-array/description/

var search = function(nums, target) {
    let left = 0, right = nums.length -1;

    while (left <= right) {
        const mid = Math.floor((left + right)/ 2);
        if (nums[mid] === target) {
            return mid
        } else if (nums[left] <= nums[mid]) {  //   Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;  // target is in left sorted half
            } else {
                left = mid + 1; // target is in right half
            }
        } else {  // Right half is sorted
            if (nums[right] >= target && target > nums[mid] ) {
                left = mid + 1  // target is in right sorted half
            } else {
                right = mid -1  // target is in left half
            }
        }
    }
    return -1
};


//Question 9: Search in Rotated Sorted Array II
// links: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/
// There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

var search = function(nums, target) {
    let left = 0, right = nums.length -1;

    while (left <= right) {
        const mid = Math.floor((left + right)/ 2);
        if (nums[mid] === target) {
            return true
        } 
        
        // If we can't tell which side is sorted (duplicates), shrink both ends
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
        }
        else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false
};

//Question 10: Find Minimum in Rotated Sorted Array
// links: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

var findMin = function(nums) {
    let left =0, right = nums.length -1;

    while (left < right) {
        let mid = Math.floor((left + right)/2);
        if ( nums[mid] > nums[right]) { // Minimum must be on the right
            left = mid  + 1
        } else {
            right = mid  // Minimum must be on the left
        }
    }
    return nums[left];
};

//Question 11: Find Minimum in Rotated Sorted Array II
// links: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/

var findMin = function(nums) {
    let left =0, right = nums.length -1;

    while (left < right) {
        let mid = Math.floor((left + right)/2);
       
        if ( nums[mid] > nums[right]) {
            left = mid  + 1
        } else if ( nums[mid] < nums[right]) {
            right = mid 
        } else {
         right--
        }
    }
    return nums[left];
};


//Question 12: Find Peak Element
// links: https://leetcode.com/problems/find-peak-element/description/

var findPeakElement = function(nums) {
    let left =0, right = nums.length -1;

    while (left < right) {
        let mid = Math.floor((left + right)/2);
        if ( nums[mid] > nums[mid + 1]) {  // Peak must be on the left
            right = mid
        } else {
            left = mid + 1  // Peak must be on the right
        }
    }
    return left;
};

//Question 13: Peak Index in a Mountain Array
// links: https://leetcode.com/problems/peak-index-in-a-mountain-array/description/

var peakIndexInMountainArray = function(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < arr[mid + 1]) {  // Peak must be on the left
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
};

//Question 14: Koko Eating Bananas
// links: https://leetcode.com/problems/koko-eating-bananas/description/

var minEatingSpeed = function(piles, h) {
    let left = 1;
    let right = Math.max(...piles) //  maximum speed (no need to eat faster than largest pile)
    let result = right;
    while (left < right) {
        let mid = Math.floor((left + right)/2);
        
        // calculate hours needed with speed = mid
        let hours = 0;
        for (let p of piles) {
            hours += Math.ceil(p / mid);
        }

        if (hours <= h) {
            // feasible, try smaller speed
            result = mid;
            right = mid - 1;
        } else {
            // Increase speed
            left = mid + 1
        } 
    }

    return result;
};

//Question 15: Capacity To Ship Packages Within D Days
// links: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

var shipWithinDays = function(weights, days) {
    let left = Math.max(...weights);
    let right = weights.reduce((a, b) => a + b, 0);
    let result = right;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);

        // check how many days needed with this capacity
        let needDays = 1, currentLoad = 0;
        for (let w of weights) {
            if (currentLoad + w > mid) {
                needDays++;
                currentLoad = 0;
            }
            currentLoad += w;
        }

        if (needDays <= days) {
            // feasible, try smaller capacity
            result = mid;
            right = mid - 1;
        } else {
            // too small, need bigger capacity
            left = mid + 1;
        }

    }
    return result
};

//Question 15: Split Array Largest Sum
// links: https://leetcode.com/problems/split-array-largest-sum/description/

// Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.
// Return the minimized largest sum of the split.


var splitArray = function(nums, k) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    let result = right;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);

        // Check how many subarrays needed if max sum = mid
        let subarrays = 1, currentSum = 0;
        for (let num of nums) {
            if (currentSum + num > mid) {
                subarrays++;
                currentSum = 0;
            }
            currentSum += num;
        }

        if (subarrays <= k) {
            // feasible, try smaller largest sum
            result = mid;
            right = mid - 1;
        } else {
            // too small, need larger sum
            left = mid + 1;
        }
    }

    return result;
};

//Question 16: Search a 2D Matrix
// links: https://leetcode.com/problems/search-a-2d-matrix/description/

var searchMatrix = function(matrix, target) {
    let m = matrix.length;
    let n = matrix[0].length;

    let left = 0; let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right)/2);
        let value = matrix[Math.floor(mid / n)][mid % n];

        if (value === target) return true;
        else if (value < target) {
            left = mid +1
        } else {
            right = mid -1
        }

    }

    return false
};


//Question 17:  Search a 2D Matrix II
// links: https://leetcode.com/problems/search-a-2d-matrix-ii/description/

var searchMatrix = function(matrix, target) {
    let m = matrix.length, n = matrix[0].length;

    let row = 0, col = n-1;

    while (row < m && col >= 0) {
        if (matrix[row][col] === target) {
            return true
        } else if (matrix[row][col] > target) {
            col--  // move left
        } else {
            row++   // move dow
        }
    }

    return false;
};



