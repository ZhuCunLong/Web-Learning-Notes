/**
 * @param {string} s
 * @return {number}
 */
// 题解：滑动窗口
var lengthOfLongestSubstring = function(s) {
	let str = ''
	let max = 0
	let index = 0
	for(let i = 0;i<s.length;i++){
		index = str.indexOf(s[i])
		if(index===-1){
			str += s[i]
			max = Math.max(str.length, max)
		} else if(index === str.length -1) {
			str = s[i]
		} else {
			str += s[i]
			str = str.substring(index+1,str.length)
		}
	}
	return max
};

console.log(lengthOfLongestSubstring('ckilbkd'))
