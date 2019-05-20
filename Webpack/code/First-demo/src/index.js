let str = require('./public/js/a.js')

function test1() {
	console.log('这是一个测试函数')
}

function test() {
	return test1;
}

test()

