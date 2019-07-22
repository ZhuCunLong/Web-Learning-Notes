function fun(func, times, wait) {
	return function (str) {
		for (let i = 0; i < times; i++)
			setTimeout(() => {
				func(str)
			}, wait)
	}
}


function fun2(func, times, wait) {
	return function (str) {
		let i = 0;
		const timer = setInterval(() => {
			i++
			func(str)
			if(i === times)
				clearInterval(timer)
		}, wait)

	}
}

fun2(console.log, 4,1000)('hello')

/*let i = 0
const timer = setInterval(() => {

	i++
	console.log('hello')
	if(i === 4)
		clearInterval(timer)
}, 1000)*/
