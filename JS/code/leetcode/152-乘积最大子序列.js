/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
	if(nums.length===1)
		return nums[0];
	let i = 0;
	const arr = nums.reduce((pre,cur,index,array) => {
		if(cur!==0){
			if(pre[i]){
				pre[i].push(cur);
			} else {
				pre.push([cur]);
			}
		}
		else{
			if(pre.length&&array[index-1])
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

const nums = [0,0,3,-5,-1]

//console.log(maxProduct(nums))


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

// 计算没有0的数组最大序列的乘积
function getMax(nums) {
	const obj = getIsFuCounts(nums)
	// 如果数组中负数的数量为偶数，则整个数组的乘积即为最大值
	if(obj.flag){
		return getMulti(nums)
	} else {
		// 继续拆分数组，第一个负数之前的部分和第一负数之后的部分
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
			}
		}
		// 如果只有一个奇数，不用进行第二次运算
		if(obj.size===1)
			return arr1[0]>arr1[1]?arr1[0]:arr1[1];
		// 第二种情况，从最后一个负数
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

// 获得数组乘积
function getMulti(nums) {
	return nums.reduce((pre,cur) => {
		return pre*cur;
	},1)
}

function get(arr) {
	var newArr = []
	var num = 1
	for (let i = 0; i < arr.length; i++) {
		num = arr[i]
		for (let j = 0; j < arr.length - i - 1; j++) {
			num = num * arr[1 + j + i]
			newArr.push(num)
		}

	}
	return newArr.sort(function (a, b) {
		return b - a
	})[0] ? newArr.sort(function (a, b) {
		return b - a
	})[0] : 0
}

console.log(get(nums))

