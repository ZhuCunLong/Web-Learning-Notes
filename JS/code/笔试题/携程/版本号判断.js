var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let cur_line = 0;
let arr1 = [];
let arr2 = [];
rl.on('line', function (line) {
	if (cur_line === 0) {
		arr1 = line.split('.');
		arr1 = arr1.map(item => parseInt(item))
		cur_line++;
	} else {
		arr2 = line.split('.');
		arr2 = arr2.map(item => parseInt(item))
		console.log(compare(arr1, arr2));
		cur_line = 0;
	}
})

function compare(arr1, arr2) {
	if (arr1[0] < arr1[0]) {
		return combine(arr1, arr2);
	} else if (arr1[0] > arr2[0]) {
		return combine(arr2, arr1);
	} else if (arr1[0] === arr2[0]) {
		if (arr1[1] < arr2[1]) {
			return combine(arr1, arr2);
		} else if(arr1[1] > arr2[1]) {
			return combine(arr2, arr1);
		} else if (arr1[1] === arr2[1]) {
			// 第三位都存在
			if(arr1[2]&&arr2[2]){
				if (arr1[2] <= arr2[2]) {
					return combine(arr1, arr2);
				} else if(arr1[2] > arr2[2]) {
					return combine(arr2, arr1);
				}
			} else if(!arr1[2]&&arr2[2]) {
				return combine(arr1, arr2);
			} else {
				return combine(arr2, arr1);
			}
		}
	}

}

function combine(arr1, arr2) {
	return arr1.join('.') + ',' + arr2.join('.')
}


