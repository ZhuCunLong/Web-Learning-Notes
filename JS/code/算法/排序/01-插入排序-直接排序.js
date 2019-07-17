function inserSort(arr) {
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



const arr1 = [7,6,5,4,3,2,1]
inserSort(arr1)
console.log(arr1)
