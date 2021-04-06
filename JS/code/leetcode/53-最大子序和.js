/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	let pre = nums[0]
	let max = nums[0]
	for (let i = 1; i < nums.length; i++) {
		pre = Math.max(pre + nums[i], nums[i])
		max = Math.max(max, pre)
	}
	return max
};

// dp解法
// dp[i]表示以第i个数结尾的最大值
// 这个动态规划的数组表示的并不是最终结果，只是中间解
var maxSubArray1 = function (nums) {
	const dp = [...nums]
	let max = nums[0]
	for (let i = 1; i < nums.length; i++) {
		dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
		max = Math.max(max, dp[i])
	}
	return max
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
