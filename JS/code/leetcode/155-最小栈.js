/**
 * initialize your data structure here.
 */
var MinStack = function() {
	this.arr = []
	this.min = -1
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
	if(this.arr.length === 0){
		this.min = val
	} else {
		this.min = Math.min(val, this.min)
	}
	this.arr.push(val)

};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
	const pop = this.arr.pop()
	if(pop === this.min && this.arr.length > 0){
		this.min = this.arr.reduce((pre, cur) => {
			return Math.min(pre, cur)
		}, this.arr[0])
	}
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
	return this.arr[this.arr.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
	return this.min
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
