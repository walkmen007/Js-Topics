//question 1: Reverse Linked List
// links: https://leetcode.com/problems/reverse-linked-list/description/
// Approach: Iterative
// 1. Initialize three pointers: prev, current, and next.
// 2. Iterate through the list:
//     * Update next to current.next.
//     * Reverse current.next to point to prev.
//     * Move prev to current and current to next.
// 3. Return prev as the new head.

var reverseList = function(head) { 
  let prev = null;
  let current = head;
  while(current != null){
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

var reverseList2 = function(head) {
  if (head == null || head.next == null){
    return head;
  }
  let newHead = reverseList2(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

//Question 2: Linked List Cycle
// https://leetcode.com/problems/linked-list-cycle/description

var hasCycle = function(head) {
  if (head == null && head.next == null) {
      return false;
  }
  let slow = head, fast = head;
  while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow == fast) {
          return true;
      }
  }

  return false;
};


//Question 3: Merge Two Sorted Lists
// https://leetcode.com/problems/merge-two-sorted-lists/description

var mergeTwoLists = function(list1, list2) {
  let dummy = new ListNode(0);
  let current = dummy;
  while(list1 != null && list2 != null){
    if(list1.val < list2.val){
      current.next = list1;
      list1 = list1.next;
    }else{
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  if(list1 != null){
    current.next = list1;
  }
  if(list2 != null){
    current.next = list2;
  }
  return dummy.next;
};

function mergeTwoListsRecursive(list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.val <= list2.val) {
      list1.next = mergeTwoListsRecursive(list1.next, list2);
      return list1;
  } else {
      list2.next = mergeTwoListsRecursive(list1, list2.next);
      return list2;
  }
}

//Question 4: Remove Nth Node From End of List
// https://leetcode.com/problems/remove-nth-node-from-end-of-list/description

var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let slow = dummy, fast = dummy;
  for(let i = 0; i < n; i++){
    fast = fast.next;
  }
  while(fast.next != null){
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
} 

//Question 5: Middle of the Linked List
// https://leetcode.com/problems/middle-of-the-linked-list/description

var middleNode = function(head) {
  let slow = head, fast = head;
  while(fast != null && fast.next != null){
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

//Question 6: Linked List Cycle II
// https://leetcode.com/problems/linked-list-cycle-ii/description

var detectCycle = function(head) {
  let slow = head, fast = head;
  while(fast != null && fast.next != null){
    slow = slow.next;
    fast = fast.next.next;
    if(slow == fast){
      break;
    }
  }
  if(fast == null || fast.next == null){
    return null;
  }
  slow = head;
  while(slow != fast){
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

// question 7: Intersection of Two Linked Lists
// https://leetcode.com/problems/intersection-of-two-linked-lists/description

var getIntersectionNode = function(headA, headB) {
  let A = headA, B = headB;
  while(A != B){
    A = A == null ? headB : A.next;
    B = B == null ? headA : B.next;
  }
  return A;
}
