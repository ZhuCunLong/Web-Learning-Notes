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
 * @return {TreeNode}
 */
var invertTree = function(root) {
	invert(root)
	return root
};

function invert (root) {
	if(root === null){
		return
	}
	const tmp = root.left
	root.left = root.right
	root.right = tmp
	invert(root.left)
	invert(root.right)
}

invertTree = function (root) {
	if(root === null){
		return null
	}
	const left = invertTree(root.right)
	const right = invertTree(root.left)
	root.left = left
	root.right = right
	return root
}
