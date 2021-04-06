function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val)
	this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
	const pHead = new ListNode(-1)
	let tmp = pHead
	while (l1 !== null && l2 !== null) {
		if (l1.val <= l2.val) {
			tmp.next = l1
			l1 = l1.next
		} else {
			tmp.next = l2
			l2 = l2.next
		}
		tmp = tmp.next
	}
	if (l1 !== null) {
		tmp.next = l1
	}
	if (l2 !== null) {
		tmp.next = l2
	}
	return pHead.next
}

var mergeTwoLists1 = function (l1, l2) {
	if(l1 === null){
		return l2
	} else if (l2 === null) {
		return l1
	} else if (l1.val <= l2.val) {
		return l1.next = mergeTwoLists1(l1.next, l2)
	} else {
		return l2.next = mergeTwoLists1(l1, l2.next)
	}
}
