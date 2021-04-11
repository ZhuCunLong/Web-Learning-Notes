const {ListNode, LinkedList} = require('./utils/ListNode')

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
	let p = l1, q = l2
	let flag = false
	let result = new ListNode(0)
	let tmp = result
	while (p || q) {
		const t1 = p ? p.val : 0
		const t2 = q ? q.val : 0
		const add = t1 + t2 + (flag ? 1 : 0)
		flag = add >= 10
		if (flag) {
			tmp.next = new ListNode(add % 10)
		} else {
			tmp.next = new ListNode(add)
		}
		tmp = tmp.next
		if (p) {
			p = p.next
		}
		if (q) {
			q = q.next
		}
	}
	if (flag) {
		tmp.next = new ListNode(1)
	}
	return result.next
};

const l1 = (new LinkedList([9,9,9,9,9,9,9])).head
const l2 = (new LinkedList([9,9,9,9])).head

const head = addTwoNumbers(l1, l2)
const link = new LinkedList(head)
console.log(link.toArray())
