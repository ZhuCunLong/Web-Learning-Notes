var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let cur_line = 0;
let str1;
let str2;
rl.on('line', function (line) {
	if (cur_line === 0) {
		str1 = line;
		cur_line++;
	} else {
		str2 = line;
		console.log(fn(str1, str2));
		cur_line = 0;
	}
})

function fn(str1, str2) {
	let len1 = str1.length;
	let len2 = str2.length;
	let dp = [];
	let max = 0;
	for (let i = 0; i < Math.max(len1, len2) + 1; i++) {
		dp[i] = [];
	}
	for (let i = 0; i < len1 + 1; i++) {
		dp[i][0] = 0;
	}
	for (let i = 0; i < len1 + 1; i++) {
		dp[0][i] = 0;
	}
	for (let i = 1; i < len1 + 1; i++) {
		for (let j = 1; j < len2 + 1; j++) {
			if(str1[i-1] === str2[j-1]){
				dp[i][j] = dp[i-1][j-1] +1;
			}
			if(dp[i][j]>max){
				max = dp[i][j]
			}
		}
	}
	return max;
}

