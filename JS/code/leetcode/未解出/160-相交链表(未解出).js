/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// 00000*** 0***
// 0*** 00000***
var getIntersectionNode = function (headA, headB) {
	let p = headA
	const set = new Set()
	while(p!==null){
		set.add(p)
		p = p.next
	}
	p = headB
	while (p!==null){
		if(set.has(p)){
			return p
		}
		p = p.next
	}
	return null
};

var getIntersectionNode1 = function (headA, headB) {
	if (headA === null || headB === null) {
		return null;
	}
	let p = headA, q = headB
	while (p!==q){
		if(p === null){
			p = headB
		} else {
			p = p.next
		}
		if(q === null){
			q = headA
		} else {
			q = q.next
		}
	}
	return p
}

const set = new Set()
const obj = {a:1}
set.add(obj)
console.log(set.has(obj))

