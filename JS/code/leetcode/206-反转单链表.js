/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 时间复杂度O(2n)
var reverseList = function(head) {
	const stack = []
	let p = head
	while (p !=null ){
		stack.push(p.val)
		p = p.next
	}
	const result = new ListNode(-1)
	p = result
	while(stack.length !==0){
		p.next = new ListNode(stack.pop())
		p = p.next
	}
	return result.next
};

reverseList = function (head){
	let pre = null
	let cur = head
	while(cur !==null){
		const next = cur.next
		cur.next = pre
		pre = cur
		cur = next
	}
	return pre
}
