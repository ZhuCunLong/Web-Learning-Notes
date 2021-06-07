/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
   let p = head
   let q = head
   while(n-- > 0) {
     q = q.next
   }
   if(q === null){
     return null
   }
   while(q.next!=null){
     p = p.next
     q = q.next
   }
   p.next = p.next.next
   return head
};
