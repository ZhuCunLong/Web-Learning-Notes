const arr1 = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
];

// 本题为考试多行输入输出规范示例，无需提交，不计分。
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let cur_line = 0;
let M, N;
let arr = [];
rl.on('line', function (line) {
	if (cur_line === 0) {
		const tmp = line.split(' ').map(item => parseInt(item));
		N = tmp[0];
		M = tmp[1];
		cur_line++;
	} else {
		const tmp = line.split(' ');
		arr.push(tmp);
		if (cur_line === N) {
			fn(arr);
			arr = [];
			cur_line = 0;
		} else {
			cur_line++;
		}
	}
})

function fn(arr) {
	let x = 0, y = 0;
	let direction = 0;  // 0下，1右，2上，3左
	let flag = 0; // 方向的转向次数；判断两次停止
	const res = [];
	while (true) {
		if (arr[x][y] !== 'y') {
			res.push(arr[x][y]);
			arr[x][y] = 'y';
		}
		if (direction === 0) {
			x++;
			// 如果需要转向
			if (x === N || arr[x][y] === 'y') {
				if (flag === 1) {
					break;
				}
				x--;// 竖向退一步
				flag++;// 判断次数+1
				direction = 1;
			} else {
				flag = 0;
			}
		}
		if (direction === 1) {
			y++;
			if (y === M || arr[x][y] === 'y') {
				if (flag === 1) {
					break;
				}
				y--;
				flag++;
				direction = 2;
			} else {
				flag = 0;
			}
		}
		if (direction === 2) {
			x--;
			if (x === -1 || arr[x][y] === 'y') {
				if (flag === 1) {
					break;
				}
				x++;
				flag++;
				direction = 3;
			} else {
				flag =0;
			}
		}
		if(direction === 3) {
			y--;
			if(arr[x][y]=== 'y'){
				if(flag === 1){
					break;
				}
				y++;
				flag++;
				direction = 0;
			} else {
				flag = 0;
			}
		}
	}
	console.log(res.join(' '))
}
