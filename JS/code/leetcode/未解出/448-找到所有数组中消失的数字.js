/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 这道题的目的在于利用原数组构建哈希表，并且在这个过程还能够保证在原数组发生变化的情况下恢复原数组的值
// 两种处理方式，一种是+n取模，一种是取负数再绝对值
var findDisappearedNumbers = function(nums) {
	for (const num of nums) {
		const index = Math.abs(num) - 1
		nums[index] = -Math.abs(nums[index])
	}
	const result = []
	for(let i = 0;i<nums.length;i++){
		if(nums[i]>0){
			result.push(i+1)
		}
	}
	return result
};

const result  = findDisappearedNumbers([4,3,2,7,8,2,3,1])
console.log(result)


