function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val)
	this.next = (next === undefined ? null : next)
}

class LinkedList {
	constructor(...args) {
		if(Array.isArray(args[0])){
			const arr =args[0]
			if(arr.length===0) {
				this.head = new ListNode(-1)
			} else {
				this.head = new ListNode(-1)
				arr.reduce((pre, cur) => {
					pre.next = new ListNode(cur)
					return pre.next
				}, this.head)
				this.head = this.head.next
			}
		} else {
			this.head = args[0]
		}
	}

	toArray(){
		let p =this.head
		const arr = []
		while (p){
			arr.push(p.val)
			p = p.next
		}
		return arr
	}
}

module.exports = {
	ListNode,
	LinkedList
}
