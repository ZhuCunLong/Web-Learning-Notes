/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
	s = s.replace(/(^\s*)|(\s*$)/g, "")
		.split(/\s+/).reverse().join(' ');
	console.log(s);
};

const s = 'the sky is blue'

reverseWords(s);
