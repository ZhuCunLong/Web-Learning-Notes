/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
	if(!root)
		return 0
	root.depth = 1;
	let max = 1;
	function deep (root) {
		if(root.left){
			root.left.depth = root.depth + 1
			max = Math.max(root.depth + 1, max)
			deep(root.left)
		}
		if(root.right){
			root.right.depth = root.depth + 1
			max = Math.max(root.depth + 1, max)
			deep(root.right)
		}
	}
	deep(root)
	return max
}

var maxDepth1 = function (root) {
	return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

const root = {
	val:3,
	left: {
		val: 9,
		left: null,
		right:null
	},
	right: {
		val: 20,
		left: {
			val: 15,
			left: null,
			right: null
		},
		right: {
			val: 7,
			left: null,
			right: null
		}
	}
}

console.log(maxDepth(root))
