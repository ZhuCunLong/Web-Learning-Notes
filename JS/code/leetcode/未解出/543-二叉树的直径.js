/*
* 这题与104还是有一点点差距，以为能简单的通过左子树的深度加右子树的深度来求得答案，其实不然，当某一侧的子树
* 非常复杂时，也可能确实不需要经过根节点
* */

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

var diameterOfBinaryTree = function(root) {
	return maxDepth(root.left) + maxDepth(root.right)
};

diameterOfBinaryTree = function (root) {
	let res = 0
	function depth(node) {
		if(!node){
			return 0
		}
		const l = depth(node.left)
		const r = depth(node.right)
		res = Math.max(res, l + r)
		return Math.max(l,r) + 1
	}
	depth(root)
	return res
}



