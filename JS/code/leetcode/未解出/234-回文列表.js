/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 最差解
var isPalindrome = function(head) {
	let p = head
	const arr = []
	while(p!==null){
		arr.push(p.val)
		p = p.next
	}
	const length = arr.length
	for(let i = 0;i<Math.floor(length/2);i++){
		if(arr[i] !== arr[arr.length-1-i]){
			return false
		}
	}
	return true
};
