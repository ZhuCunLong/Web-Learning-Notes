/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
	const map = {}
	for(let i = 0;i<nums.length;i++){
		if(map[nums[i]]){
			delete map[nums[i]]
		} else {
			map[nums[i]] = 1
		}
	}
	return Number(Object.keys(map)[0])
};


/*答案是使用位运算。对于这道题，可使用异或运算。异或运算有以下三个性质。

1.任何数和 0做异或运算，结果仍然是原来的数
2.任何数和其自身做异或运算，结果是 0
3.异或运算满足交换律和结合律*/
var singleNumber1 = function (nums) {
	return nums.reduce((pre,cur) => {
		return pre ^ cur
	}, 0)
}

// console.log(singleNumber1([4,1,2,1,2,4,5]))
console.log(3 ^ 4)
