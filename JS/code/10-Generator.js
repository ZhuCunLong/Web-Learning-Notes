/*
// ******************************
// generator 函数调用next()方法执行的内容和返回值
function* helloWorldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloWorldGenerator()

/!*console.log(hw)
console.log(hw.next().value)*!/

function* firstGenerator(){
	console.log('hello generator')
	console.log('1.' + (yield 1))
	console.log('2.' + (yield 2))
	return 'done'
}

const fg = firstGenerator()

console.log(fg)
console.log(fg.next())
console.log(fg.next('hi'))
console.log(fg.next())
*/

// ******************************
// yield后面的代码执行情况
/*var gen = function* gen(){
	yield console.log('a');
	yield console.log('b');
	yield console.log('c');
}

var g = gen()
g.next() // a
g.next() // b
g.next() // c*/

// ******************************
// yield表达式作为右值进行赋值操作
/*function add(x){
	return x+3;
}
function* foo() {
	var x = yield add(3);
	var y = x;
	const z = add(yield y+3);
	return z;
}

var it = foo();

console.log(it.next()); // { value:3, done:false }
console.log(it.next(4));
console.log(it.next(20));*/

// ******************************
// 连续使用
function add(x){
	return x+3;
}
function* foo(value) {
	var x = yield add(value);
	console.log(x);
	var y = yield add(x);
	console.log(y);
	var z = yield add(y);
	console.log(z);
}



function scheduler(task) {
	// 将task的值迭代使用，获取之后作为下一次next()的参数
	var taskObj = task.next(task.value);
	// 如果Generator函数未结束，就继续调用
	if (!taskObj.done) {
		task.value = taskObj.value
		scheduler(task);
	}
}

scheduler(foo(3));

