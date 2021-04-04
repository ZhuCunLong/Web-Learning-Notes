/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
	const str = s.split('')
	const cache = []
	if(str.length % 2 !==0)
		return false
	while(str.length>0){
		const char = str.shift()
		if(isLeftChar(char)){
			cache.push(char)
		} else {
			if(!pipei(char, cache)){
				return false
			}
		}
	}
	return cache.length === 0
}

function isLeftChar(char){
	return char === '{' || char === '[' || char === '('
}

function pipei(char, cache){
	const cacheChar = cache[cache.length-1]
	if((char === '}' && cacheChar === '{')
		|| (char === ')' && cacheChar === '(')
		|| (char === ']' && cacheChar === '[')){
		cache.pop()
		return true
	}
	return false
}

console.log(isValid('[['))
