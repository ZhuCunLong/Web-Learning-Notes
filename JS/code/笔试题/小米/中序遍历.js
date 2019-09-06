function fn(str) {
	const x = str[0];
	if(str.length === 1)
		return x;
	if(str.length === 0)
		return '';
	const tmp = str.substring(2, str.length - 1);
	const {y, z} = findxy(tmp);
	return `${fn(y)}${x}${fn(z)}`;
}

function findxy(str) {
	let index;
	let stack = [];
	for (let i = 0; i < str.length; i++) {
		if(str[i] === '('){
			stack.push('(')
		} else if(str[i] === ')') {
			stack.pop();
		} else if(stack.length === 0 && str[i] === ',') {
			index = i;
			break;
		}
	}
	return {
		y: str.substring(0,index),
		z: str.substring(index+1, str.length)
	}
}

var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function (line) {
	console.log(fn(line))
})


