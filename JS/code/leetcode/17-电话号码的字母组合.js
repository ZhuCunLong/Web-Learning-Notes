/**
 * @param {string} digits
 * @return {string[]}
 */
// 相对较优解，深度 / 广度
var letterCombinations = function(digits) {
	const map = {
		2: ['a', 'b', 'c'],
		3: ['d', 'e', 'f'],
		4: ['g', 'h', 'i'],
		5: ['j', 'k', 'l'],
		6: ['m', 'n', 'o'],
		7: ['p', 'q', 'r', 's'],
		8: ['t', 'u', 'v'],
		9: ['w', 'x', 'y', 'z']
	}
	if(digits.length === 0) {
		return []
	} else if( digits.length === 1) {
		return map[digits]
	} else if(digits.length === 2) {
		const res = []
		for(let i = 0; i<map[digits[0]].length;i++){
			for(let j = 0;j<map[digits[1]].length;j++){
				res.push(map[digits[0]][i]+map[digits[1]][j])
			}
		}
		return res
	} else if(digits.length ===3){
		const res = []
		for(let i = 0; i<map[digits[0]].length;i++){
			for(let j = 0;j<map[digits[1]].length;j++){
				for(let k = 0;k<map[digits[2]].length;k++)
				res.push(map[digits[0]][i]+map[digits[1]][j]+map[digits[2]][k])
			}
		}
		return res
	} else if(digits.length === 4){
		const res = []
		for(let i = 0; i<map[digits[0]].length;i++){
			for(let j = 0;j<map[digits[1]].length;j++){
				for(let k = 0;k<map[digits[2]].length;k++){
					for(let m =0;m<map[digits[3]].length;m++){
						res.push(map[digits[0]][i]+map[digits[1]][j]+map[digits[2]][k]+map[digits[3]][m])
					}
				}
			}
		}
		return res
	}
};
