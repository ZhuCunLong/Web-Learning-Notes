function bubbleSor(arr) {
	for(let i= 0;i < arr.length ; i++){
		let flag = true;
		for(let j=0;j < arr.length - i - 1; j++){
			if(arr[j] > arr[j+1]){
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]]
				flag = false
			}
		}
		if(flag)
			return arr
	}
}

const arr1 = [7,4,5,6,3,1,2]
console.log(bubbleSor(arr1))
console.log(arr1)

