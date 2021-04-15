/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
	const hash = {}
	for(let i = 0;i<nums.length;i++){
		if(hash[nums[i]]){
			hash[nums[i]]++
		} else {
			hash[nums[i]] = 1
		}
		if(hash[nums[i]] > Math.floor(nums.length/2)){
			return nums[i]
		}
	}
};

console.log(majorityElement([1]))
