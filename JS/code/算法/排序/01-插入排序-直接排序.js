function insertSort(arr) {
	for(let i = 0;i<arr.length-1;i++){
		const tmp = arr[i+1]
		let j = i
		while(arr[j]>tmp&&j>-1){
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = tmp
	}
}

Array.prototype.insertSort = function (callback) {
	for(let i = 0;i<this.length-1;i++){
		const tmp = this[i+1]
		let j = i
		while(callback(this[j],tmp)&&j>-1){
			this[j+1] = this[j]
			j--
		}
		this[j+1] = tmp
	}
	return this
}


const arr1 = [7,4,5,6,3,1,2]
//const arr1 = [7,6,5,4,3,2,1]
console.log(arr1.insertSort((a,b)=> a>b))
console.log(arr1)
