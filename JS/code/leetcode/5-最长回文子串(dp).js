/**
 * @param {string} s
 * @return {string}
 */
// 未使用dp，方法本质是暴力求解
var longestPalindrome = function(s) {
	let max = 1
	let res = s[0]
	for(let i = 1;i<s.length;i++) {
		for(let j = 0;j<i;j++){
			if(s[j] === s[i] && i - j + 1 > max && isPalindrome(s.substring(j, i+1))){
				max = i - j + 1
				res = s.substring(j, i+1)
			}
		}
	}
	return res
};

function isPalindrome (s) {
	for(let i = 0;i<Math.floor(s.length/2);i++) {
		if(s[i] !== s[s.length - i -1]){
			return false
		}
	}
	return true
}
