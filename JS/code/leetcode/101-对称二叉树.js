
function TreeNode(val, left, right) {
	this.val = (val === undefined ? 0 : val)
	this.left = (left === undefined ? null : left)
	this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
	const left = root.left;
	const right = root.right;
	return compare(left, right)
};

function compare(left, right){
	if(left === null && right === null){
		return true
	} else if(left === null || right === null) {
		return false
	}
	if(left.val === right.val) {
		const left1 = left.left, left2 = left.right
		const right1 = right.left, right2 = right.right
		return compare(left1, right2) && compare(left2, right1)
	} else {
		return false
	}
}
