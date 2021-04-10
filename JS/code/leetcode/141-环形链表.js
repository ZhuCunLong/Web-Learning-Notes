/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
	while(head){
		if(head.visited) {
			return true
		}
		head.visited = true
		head = head.next
	}
	return false
};

/*
空间复杂度为1的算法
本方法需要读者对「Floyd 判圈算法」（又称龟兔赛跑算法）有所了解。

假想「乌龟」和「兔子」在链表上移动，「兔子」跑得快，「乌龟」跑得慢。当「乌龟」和「兔子」从链表上的同一个节点开始移动时，如果该链表中没有环，
那么「兔子」将一直处于「乌龟」的前方；如果该链表中有环，那么「兔子」会先于「乌龟」进入环，并且一直在环内移动。等到「乌龟」进入环时，由于「兔子」
的速度快，它一定会在某个时刻与乌龟相遇，即套了「乌龟」若干圈。

我们可以根据上述思路来解决本题。具体地，我们定义两个指针，一快一满。慢指针每次只移动一步，而快指针每次移动两步。初始时，慢指针在位置 head，
而快指针在位置 head.next。这样一来，如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表。否则快指针将到达链表尾部，该链表不
为环形链表。*/

var hasCycle1 = function(head) {
	let p = head, q = null
	if(p){
		q = p.next
	}
	if(q===null || p===null){
		return false
	}
	while (p&&q) {
		if(p === q) {
			return true
		} else {
			p = p.next
			if(q.next){
				q = q.next.next
			} else {
				return false
			}
		}
	}
	return false
};



