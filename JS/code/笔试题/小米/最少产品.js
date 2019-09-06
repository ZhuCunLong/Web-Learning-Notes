var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let n;
let cur_line = 0;
let price = [];
let max;
rl.on('line', function (line) {
	if (cur_line === 0) {
		n = parseInt(line);
		cur_line++;
	} else if (cur_line <= n) {
		price.push(parseInt(line))
		cur_line++;
	} else if (cur_line === n + 1) {
		max = parseInt(line);
		cur_line = 0;
		console.log(fn(price, max));
	}
})

function fn(price, max) {
	let min = 0;
	const arr = price.sort((x, y) => y - x);
	let i = 0;
	let tmp = max;
	while (i < arr.length) {
		const count = Math.floor(tmp / arr[i])
		min+=count;
		if(tmp%arr[i] === 0) {
			break;
		} else {
			tmp = tmp%arr[i]
			i++;
		}
	}
	return min;
}

console.log(fn([100,250,6], 2600))
