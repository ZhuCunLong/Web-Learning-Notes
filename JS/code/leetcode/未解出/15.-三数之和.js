/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/*暴力
* */

var threeSum = function(nums) {
	const set = new Set()
	const res = []
	nums.sort((a,b ) => a-b)
	for(let i = 0;i<nums.length;i++){
		for(let j = i+1;j<nums.length;j++) {
			for(let k = j+ 1;k<nums.length; k++){
				if(nums[i] + nums[j] + nums[k] === 0) {
					const tmp = [nums[i], nums[j], nums[k]].toString()
					if(!set.has(tmp)){
						set.add(tmp)
						res.push([nums[i], nums[j], nums[k]])
					}
				}
			}
		}
	}
	return res
};

/*
* 1. 先排序
* 2. 双指针
 */
threeSum = function(nums) {
	const set = new Set()
	const res = []
	nums.sort((a,b ) => a-b)
	for(let i = 0;i<nums.length;i++){
		let left = i + 1;
		let right = nums.length - 1;
		while (left < right){
			if(nums[left] + nums[right] === - nums[i]){
				const tmp = [nums[i], nums[left], nums[right]].toString()
				if(!set.has(tmp)){
					set.add(tmp)
					res.push([nums[i], nums[left], nums[right]])
				}
				left++
				right--
			} else if (nums[left] + nums[right] < - nums[i]){
				left++
			} else {
				right --
			}
		}
	}
	return res
};

const nums = [-1,0,1,2,-1,-4]
console.log(threeSum(nums))

