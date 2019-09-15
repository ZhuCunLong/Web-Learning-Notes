var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let N;
let cur_line = 0;
let v = [];
rl.on('line', function (line) {
	if (cur_line === 0) {
		N = parseInt(line);
		cur_line++;
	} else {
		v = line.split(' ').map(item => parseInt(item))
		console.log(fn(v));
		cur_line = 0;
	}
})

function fn(v) {
	let n = v.length;
	const mod = 1e9 + 7;
	let dp = [];
	for (let i = 0; i <= n; i++) {
		dp[i] = [];
	}
	for (let i = 0; i <= n; i++) {
		dp[0][i] = 1;
	}
	for (let i = 0; i < n; i++) {
		if (v[i] === 0) {
			for (let j = 0, cur = 0; j < n - i; j++) {
				dp[i + 1][j] = cur = (cur + dp[i][j]) % mod;
			}
		} else {
			for (let j = n - i - 1, cur = 0; j >= 0; j--)
				dp[i + 1][j] = cur = (cur + dp[i][j + 1]) % mod;
		}
	}
	return dp[n][0];
}
