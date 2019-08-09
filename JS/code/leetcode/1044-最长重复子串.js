/**
 * @param {string} S
 * @return {string}
 */
var longestDupSubstring = function(S) {
	let max = 0;
	let maxStr = '';
	for(let i=1;i<S.length;i++){
		for(let j=0;j<i;j++){
			if(S[i] === S[j]) {
				let k = 0;
				let tmp = 0;
				let tmpStr = '';
				while (S[j+k]===S[i+k]) {
					tmpStr+=S[j+k];
					k++;
					tmp++;
				}
				if(tmp>max){
					max = tmp;
					maxStr = tmpStr;
				}
			}
		}
	}
	return maxStr;
};

const str = "banana"
console.log(longestDupSubstring(str))


