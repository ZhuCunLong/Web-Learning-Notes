var arr = [
	{title:"zbc",id:7},
	{title:"523",id:5},
	{title:"223",id:2},
	{title:"123",id:1},
	{title:"abc",id:6},
	{title:"323",id:3},
	{title:"423",id:4}

]

function BubbleSort(arr,callback) {
	for(let i=0,len = arr.length;i<len-1;i++){
		// 如果一轮比较中没有需要交换的数据，则说明数组已经有序
		let flag = true
		for(let j = 0; j < len - i - 1; j++){
			if(callback(arr[j], arr[j+1])) {
				// 顺序交换
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				flag = false
			}
		}
		if(flag)
			return
	}
}

const condition = function (rankby) {
	return (t1,t2) => t1[rankby] > t2 [rankby]
}

/*var arr1 = arr.sort(condition('title'))

console.log(arr)
console.log(arr1)*/

BubbleSort(arr, condition('title'))
console.log(arr)


/*var arr2 = arr.sort(function(t1,t2){
	return t1['id'] > t2['id'];
})
console.log(arr2)*/
