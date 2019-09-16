// 本题为考试多行输入输出规范示例，无需提交，不计分。
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let cur_line = 0;
let s;
rl.on('line', function (line){
	if(cur_line===0){
		s = parseInt(line.split(' ')[1])
		cur_line++;
	} else {
		const arr = line.split(' ').map(item => parseInt(item));
		console.log(fn(arr));
		cur_line = 0;
	}
})

function fn(arr) {
	let tmp = 0;
	for(let i = 0;i<arr.length;i++){
		if(tmp+arr[i]>s)
			return tmp;
		else
			tmp+=arr[i];
	}
	return tmp;
}
