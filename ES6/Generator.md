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

第`7`行代码执行时，不会执行Generator函数firstGenerator中的任何一行代码，`fg`是一个`[Generator]`对象

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

## 协程的概念

协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

### 个人理解

感觉有点蠢，假设要干三件事，三件事每件的结果毫无关系，如果不是为了延时，用generator就是没必要，就算为了延时，使用计时器都比这个来的方便。如果因为第二件事不知道什么时候结束才能开始干第三件事，想要达到异步的效果还是得借用回调，回调可以找到触发执行第三件事的**时机**。

下面看看这个所谓异步任务的封装与执行

```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

- 从封装上来看，看起来确实像是个同步串行操作。
- 但是实际的执行，这玩意看起来还是个promise，无非是第二次执行`next()`的时候把得到的数据传回`gen()`中了。

> 可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。
>
> ——《ECMAscript6入门》

## Thunk函数

### 参数的求值策略

求值策略是说函数参数何时进行计算

```js
var x = 1
function f(m){
  return m*2
}

f(x+5)
```

上面代码先定义函数`f`，然后向它传入表达式`x + 5`。请问，这个表达式应该何时求值？

- 传值调用

即在进入函数体之前，就计算`x + 5`的值（等于 6），再将这个值传入函数`f`。C 语言就采用这种策略。

```js
f(x + 5)
// 传值调用时，等同于
f(6)
```

- 传名调用

即直接将表达式`x + 5`传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。

传值调用可能造成性能损失

```js
function f(a, b){
  return b;
}

f(3 * x * x - 2 * x - 1, x);
```

第一个参数非常复杂，并且实际调用过程中又没有用到。

### Thunk函数的含义

编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

```js
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

上面代码中，函数 f 的参数`x + 5`被一个函数替换了。凡是用到原参数的地方，对`Thunk`函数求值即可。

这就是 Thunk 函数的定义，**它是“传名调用”的一种实现策略，用来替换某个表达式。**

### js的Thunk函数

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);

// 等价于
Thunk(fileName)(callback);
```

> 到了这个地方，我依然觉得js大费周章地搞这么多事情，最后也就是把回调函数和普通参数给它拆成了两个函数分别去执行，在我看来是吃力不讨好的，当然，这只是generator函数异步运用的准备阶段，不知道后面有什么惊喜

### Thunkify 模块								

第三方包，实现了Thunk函数，**适用于任何参数中包含回调的函数**（看起来很强大，但是感觉就是实现了一个自以为很了不起的方法）

使用方法

```js
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});

//巨蠢无比，看不出来有多优雅
thunkify(fs.readFile)('package.json')((err,str) => {
  
})
```

看看源码：

```js
function thunkify(fn){
  assert('function' == typeof fn, 'function required');

  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done){
      var called;

      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

分离普通参数和回调函数，并且保证回调函数只执行一次

例如下面这个例子

```js
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
```

最后只会打印一次3，这么设计是为了后面配合Genertaor函数使用

### Generator 函数的流程管理

下面我们来看看Generator实现异步编程的终极表现形式

```js
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```

先来看看手动执行，再看thunk函数的自动流程管理

```js
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
```

#### Thunk函数的自动流程管理

Thunk 函数真正的威力！自动执行Generator函数

```js
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

var g = function* (){
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);
```

这个代码有点特殊的地方在于看起来似乎没有Generator函数的入口，也就是第一个`next()`方法的调用，实际上在`run()`函数中调用`next()`（`run()`方法内部定义的方法）时，就开始了第一次Generator函数next()的调用，只不过带了参数data，**没有人规定第一次调用Generator的next()方法时不能传参**，不要陷入这个误区，第一次调用时实际这个参数没有任何作用，只是为了后面递归调用的时候需要传入data。

> “上面代码中，函数`g`封装了`n`个异步的读取文件操作，只要执行`run`函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。”
>
> ——《ECMAscript6入门》
>
>  我感觉我在浪费时gan，我选择promise
>
> ——zcl

