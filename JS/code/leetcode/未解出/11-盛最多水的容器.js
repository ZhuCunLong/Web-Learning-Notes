/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力解法超时
var maxArea = function(height) {
	let max = 0;
	for(let i = 0;i<height.length;i++){
		for(let j = i+1;j<height.length;j++) {
			max = Math.max(max, (j-i) * Math.min(height[j], height[i]))
		}
	}
	return max
};

// 最优解法：双指针
maxArea1 = function (height) {
	let max = 0;
	let i = 0;
	let j = height.length -1
	while (i !==j) {
		max = Math.max(max, (j-i) * Math.min(height[j], height[i]))
		if(height[i] < height[j]){
			i++
		} else {
			j--
		}
	}
	return max
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
