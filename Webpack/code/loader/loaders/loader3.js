const { getOptions } = require('loader-utils')
module.exports = function (content, map, meta) {
	console.log('3333')
	console.log(this.getOptions())
	const options = getOptions(this)
	console.log(333, options)
	return content
}

module.exports.pitch = function (...args) {
	console.log(args.length)
	console.log('3333')
}
