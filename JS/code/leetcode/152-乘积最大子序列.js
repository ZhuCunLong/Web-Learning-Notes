/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
	if(nums.length===1)
		return nums[0];
	let i = 0;
	const arr = nums.reduce((pre,cur) => {
		if(cur!==0){
			if(pre[i]){
				pre[i].push(cur);
			} else {
				pre.push([cur]);
			}
		}
		else{
			if(pre.length)
				i++;
		}
		return pre;
	},[])

	let max = 0;
	for(let i=0;i<arr.length;i++){
		const tmparr = arr[i];
		const tmp = getMax(arr[i]);
		if(max<tmp)
			max = tmp;
	}
	return max;
};

const nums = [3,0,0,2,2]

console.log(maxProduct(nums))


/*function getZeroCounts(nums) {
	return nums.reduce((pre,cur) => {
		if(cur === 0){
			pre++;
		}
		return pre;
	},0)
}*/

function getIsFuCounts(nums) {
	const size = nums.reduce((pre,cur) => {
		if(cur<0)
			pre++;
		return pre;
	},0)
	return {
		flag: size % 2 === 0,
		size: size
	}
}

function getMax(nums) {
	const obj = getIsFuCounts(nums)
	if(obj.flag){
		return getMulti(nums)
	} else {
		const arr1 = [0,0]
		let minSize = obj.size;
		let j = 0;  // 作为负数的分界
		for(let i = 0;i<nums.length;i++){
			// 第一个负数
			if(nums[i]<0 && minSize === obj.size){
				minSize--;
				j = 1; // 计算后半部分
			} else {
				arr1[j] ===0 ? arr1[j]=nums[i]:arr1[j]*=nums[i];
				/*if(arr1[j]==0)
					arr1[j]=nums[i];
				else
				   arr1[j]*=nums[i];*/
			}
		}
		const arr2 = [0,0]
		minSize = obj.size;
		j = 0;
		for(let i = nums.length-1;i>-1;i--){
			if(nums[i]<0 && minSize === obj.size) {
				minSize--;
				j = 1;
			} else {
				arr2[j] ===0 ? arr2[j]=nums[i]:arr2[j]*=nums[i];
			}
		}
		let arr = arr1.concat(arr2);
		return arr.reduce((pre,cur) => {
			return pre>cur? pre:cur
		},arr[0])
	}
}

function getMulti(nums) {
	return nums.reduce((pre,cur) => {
		return pre*cur;
	},1)
}
