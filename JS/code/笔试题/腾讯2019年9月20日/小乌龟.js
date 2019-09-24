const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let cur_line = 0;
let str;
let n;
rl.on('line', function (line) {
	if (cur_line === 0) {
		str = line;
		cur_line++;
	} else {
		n = parseInt(line);
		cur_line = 0;
		console.log(fn(str, n));
	}
})

function fn(str, n) {
	let arr = str.split('T');
	const Nf = arr.length - 1; // F的数量
	if (Nf <= n) {
		return str.length - (n - Nf)
	} else {
		arr = arr.map(item => item.length);
		const r1 = getValue(arr,n);
		const r2 = getValue(arr.reverse(), n);
		return Math.max(r1,r2);
	}
}

function getValue(arr, n) {
	const vals = [];
	let tmp = 0;
	for (let i = 0; i <= n; i++) {
		tmp += arr[i];
	}
	vals.push(tmp+n);
	vals.concat(arr.slice(n+1));
	let res = 0;
	for (let i = 0; i < vals.length; i++) {
		res += getZF(i) * vals[i];
	}
	return Math.abs(res);
}

function getZF(i) {
	return i % 2 === 0 ? 1 : -1;
}

console.log(fn('FFFFTTTTF',2))

