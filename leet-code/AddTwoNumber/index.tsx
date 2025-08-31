// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.


class MyNode{
     val = null;
     next = null;
}

class ListNode {
    prevNode;
    head;
    insertElement = (val)=>{
        const node = new MyNode();
        node.val = val;
        //If No Node Exist. For first node insertion. 
        if(!this.head){
           this.head = node;
        }else{
            this.prevNode.next = node;
        }
        this.prevNode = node;   
    }

    deleteElement = (val)=>{
       let list = this.head; 
       if(list.val === val){
        this.head = this.head.next;
       }else{
        let prevNode = this.head;
        while(list.next){
            list = list.next;
            if(list.val === val){
              prevNode.next = list.next;
              break;
            }else{
              prevNode = list;
            }   
        }
       }
      
    }
}

const traverseList = (param)=>{
   let currentNode = param;
   console.log("Element---", param.val)
   if(!currentNode.next){
     return;
   }
   while(currentNode.next){
    currentNode = currentNode.next;
    console.log("Element---", currentNode.val);
   }
   console.log("Current nOde---", currentNode)
}

function insertNumberInLinkedList(num){
    const l1 = new ListNode();
    while (num>0){
      l1.insertElement(num%10);
      num = Math.floor(num/10);
    }
    return l1;
}

function addTwoNumbers(l1, l2){
  let carry  = 0;
  let sumList = new ListNode();
  let list1 = l1;
  let list2 = l2;
  while(list1 || list2){
    let num1 = list1?.val ? list1.val : 0;
    let num2 = list2?.val ? list2.val : 0;
    let n1n2sum = num1 + num2 + carry;
    if(n1n2sum > 9){
      carry = Math.floor(n1n2sum/10);
    }else{
      carry = 0;
    }
    sumList.insertElement(Math.floor(n1n2sum%10));
    list1 = list1?.next ? list1?.next : null;
    list2 = list2?.next  ? list2?.next : null;
  }
  if(carry)sumList.insertElement(carry);
  return sumList.head;
}

let l1 = insertNumberInLinkedList(9999999);
let l2 = insertNumberInLinkedList(9999);

let sum = addTwoNumbers(l1.head,l2.head);
traverseList(sum);
