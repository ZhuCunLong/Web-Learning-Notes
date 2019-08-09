/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
	let arr = [];
	arr.push(nums[0]);
	for(let i=0;i<nums.length-1;i++){
		let tmp = nums[i+1];
		let j = i;

		while(j>-1&&tmp!==nums[j]) {
			j--;
		}
		// 说明碰到重复了
		if(j !== -1){
			arr = arr.filter(item => {
				return item !== tmp
			});
		} else {
			arr.push(tmp);
		}
	}
	return arr;
};

/*var nums = [-1,0]

console.log(singleNumber(nums))*/

let arr = [2, 2, 3, 4, 5, 3, 4, 5, 6, 19]
sum = arr.reduce((prev, cur) => prev ^ cur)
sum &= -sum
let a = 0, b = 0
arr.forEach(item => sum & item ? a ^= item : b ^= item)

//console.log(7^5)
console.log([a,b])

