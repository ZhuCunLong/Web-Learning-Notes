/**
 * initialize your data structure here.
 */
var MinStack = function() {
	this.arr = []
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
	if(this.arr.length === 0){
		this.arr.push([val, val])
	} else {
		this.arr.push([val,Math.min(val, this.getMin())])
	}
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
	this.arr.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
	return this.arr[this.arr.length - 1][0]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
	return this.arr[this.arr.length - 1][1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
