module.exports = function (content, map, meta) {
	console.log('2222')
	/*console.log('content:', content)
	console.log('map:', map)
	console.log('meta:', meta)*/
	return content
}

module.exports.pitch = function (...args) {
	console.log(args.length)
	console.log('22222')
}
