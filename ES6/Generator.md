# Generator

## 执行与返回值

```js
function* firstGenerator(){
	console.log('hello generator')
	console.log('1.' + (yield 1))
	console.log('2.' + (yield 2))
  return 'done'
}
const fg = firstGenerator()

console.log(fg.next())
console.log(fg.next('hi'))
console.log(fg.next())

`hello generator
{ value: 1, done: false }
1.hi
{ value: 2, done: false }
2.undefined
{ value: undefined, done: true }`
```

第`7`号代码执行时，不会执行Generator函数firstGenerator中的任何一行代码，`fg`是一个`[Generator]`对象

第`9`行代码执行时，首先执行`fg.next()`，这个时候`firstGenerator`中的代码开始执行，直到碰到第一个`yiedld`关键字开始暂停，也就是暂停在第3行（第3行并不**完全**执行），本次`fg.next()`执行结束，而`fg.next()`执行结果的返回值是一个对象`{value:1,done:false}`,第9行执行时先打印'hello generator'，然后打印`fg.next()`返回值的内容。

第10行代码执行时，首先从上次next()方法暂停的地方开始执行，也就是打印`1.`再加上后面的内容，而这次的next()方法传入了参数，这个参数会替换上次暂停时`yield`部分，实际上第三行的代码变成了`console.log('1.' + 'hi')`，然后暂停在代码第4行（第4行同样不执行），这是本次`fg.next()`·的执行过程，而它的返回值也是一个对象`{value:2,done:false}`。

第`11`行代码执行时，同样执行上次暂停住的第4行，由于这次没有传参，所以打印的结果为'2.undefined'，`fg.next()`返回的结果依然是对象，内容为`{value:'done',done:true}`，已经没有下一个暂停点，也表示这个`Generator`函数的执行状态遍历完成。

> 一个函数中若出现n次yeild（包括逻辑循环，并不是指代码段中出现多少次yield），那么要想遍历完这个函数中的所有状态，需要调用next()方法n+1次，第1次调用作为整个函数的启动，换句话说，Generator函数的执行时机是第一个next()方法调用的时候。

```js
var gen = function* gen(){
	yield console.log('a');
	yield console.log('b');
	yield console.log('c');
}

var g = gen()
g.next() // a
g.next() // b
g.next() // c
```

如果`yield`后的代码是正常的代码段，第一次调用`next()`后，会执行第`2`行中`yield`后面的代码。

```js
function add(x){
	return x+3;
}
function* foo() {
	var x = yield add(3);
	var y = x;
	const z = add(yield y+3);
	return z;
}

var it = foo();

console.log(it.next()); // { value: 6, done: false }
console.log(it.next(4)); // { value: 7, done: false }
console.log(it.next(20)); // { value: 23, done: true }
```

根据上述代码的执行结果可以得出以下结论

- `it.next()`会获取暂停处表达式的值，作为返回值的`value`属性值

- `yield [exp]`的整体值由下一次`next()`方法调用传参决定，和`exp`的结果没关系
  - 调用第2个`next()`的时候，第5行代码`var x=4`，所以第二个yield的`exp`其实是`4+3`而不是`6+3`
  - 调用第3个`next()`的时候，第7行代码`const z = add(20)`，z的值为23，同理，不再多做解释

如果想要Generator函数用一种理想连续的方式运行，可使用如下处理方式
```js
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

// 3
// 6
// 9
```

