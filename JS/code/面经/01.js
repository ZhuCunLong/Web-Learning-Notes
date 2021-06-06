function sum(...args){
	let cache = []
	const func = (...args) => {
		if(args.length > 0){
			cache = cache.concat(args)
			return func
		} else {
			return cache.reduce((pre, cur) => {
				return pre + cur
			}, 0)
		}
	}
	return func(...args)
}

console.log(sum(3,4)(3,4,5)())
console.log(sum(1,2)(3,4,5)())
