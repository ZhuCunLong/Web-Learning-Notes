/**
 * @param {number} n
 * @return {number}
 */
// 递归
var climbStairs1 = function (n) {
	if (n <= 2) {
		return n
	} else
		return climbStairs(n - 1) + climbStairs(n - 2)
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	if (n <= 2) {
		return n
	} else {
		let p = 1, q = 2, tmp
		for (let i = 3; i < n + 1; i++) {
			tmp = q
			q = p + q
			p = tmp
		}
		return q
	}
};

console.log(climbStairs((6)))

