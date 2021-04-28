/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
	const xor = x ^ y
	const binaryStr = xor.toString(2)
	let count =0
	for(let i = 0;i<binaryStr.length;i++){
		if(binaryStr[i] === '1'){
			count++
		}
	}
	return count
};

const result = hammingDistance(7,8)
console.log(result)
