function selectionSort(arr) {
	for(let i = 0;i < arr.length; i++){
		let minIndex = arr.reduce((pre, cur, index, arr)=>{
			if(index <= i)
				return pre
			else
				return arr[pre] > cur ? index:pre
		},i);
		if(minIndex !== i)
			[arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
	}
	return arr
}

Array.prototype.selectionSort = function (callback) {
	for(let i = 0;i < this.length - 1; i++){
		let minIndex = this.reduce((pre, cur, index, arr)=>{
				if(index <= i)
					return pre
				else
					return callback(arr[pre], cur) ? index:pre
			},i)
		if(minIndex !== i)
			[this[minIndex], this[i]] = [this[i], this[minIndex]]
	}
	return this
}
/*const arr1 = [7,6,5,4,3,2,1]*/
const arr2 = [2,1,3,7,4,5,8,6]
/*selectionSort(arr2)
console.log(arr2)*/

arr2.selectionSort((a, b)=> a > b)
console.log(arr2)

