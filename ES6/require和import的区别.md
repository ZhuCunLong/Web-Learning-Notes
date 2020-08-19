[TOC]

# `require`和`import`的区别

## 起源

es6诞生之前，js一直没有模块系统，就连css都有`@import`，对现在复杂的大型项目开发无疑是一种阻碍。es6在2015年6月正式发布，所以es6也有一个别称es2015。官方没有提出es6之前，社区给出了解决模块问题的方案，那就是node.js。介绍到这个地方，其实`require`和`import`的起源已经出现了，es6中模块解决方案使用的关键字是`import`，而node.js提供的解决方案使用的关键字是`require`。

> node.js由Ryan Dahl在2009年发布。node.js提供的模块化也叫CommonJS，不过node.js主要用于服务端的开发，但是随着时代的发展，现在的一些前端框架也依赖node.js

## 导出命令/引入命令

要想使用`require`或者`import`，首先得知道使用这两种方式对应的导出方式是怎样的，从现在开始，下文分别以CommonJS和es6来区分两种解决方案。

### CommonJS

- 导出变量，方法，对象

```js
// testcommonjs.js
exports.a = 123;
exports.b = 'hello';
exports.c = function(){
  console.log('ccc')
}
exports.d = {
  foo: 'bar'
}

//等价=> 
module.exports.a = 123;
module.exports.b = 'hello';

//等价=> 
module.exports = {
  a:123,
  b:'hello',
  c:function(){
    console.log('ccc')
  },
  d:{
    foo：bar
  }
}
```

> 建议使用module.exports，单独使用exports在某些情况下会产生意想不到的错误，这不是本文讨论的重点

- 引入和使用

```js
//index.js
var test = require('./testcommonjs')
console.log(test.a)
console.log(test.b)
test.c()
console.log(test.d.foo)
```

### es6

- 导出变量，方法，对象（这里只列举常用的一些方法，具体的使用方法请参考[阮一峰es6入门](http://es6.ruanyifeng.com/#docs/module)）

```js
//testesmodule.js
export var a = 123
export var b = 'hello'
export function c(){
  console.log('ccc')
}
export var d = {
  foo: 'bar'
}
```

- 引入和使用

```js
import { a,b,c,d } from './testesmodule'

console.log(a)
console.log(b)
c()
console.log(d.foo)

//等价=> 
import * as test form './testesmodule'
console.log(test.a)
console.log(test.b)
test.c()
console.log(test.d.foo)
```

## 静态优化

这是从阮一峰大神的文档中学习到的一个概念。他在文档中以node的核心模块`fs`举了一个例子

- es6

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

> 注：不要试图在没有配置`babel`的项目中去测试上面的代码，因为node到目前为止依然不支持es6的模块化语法（笔者目前的node版本：v10.15.0），尽管它已经实现了绝大部分的es6特性。

- CommonJS

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
```

这样看起来，`fs`模块的引入方式在es6中和CommonJS中似乎只是语法上的区别，但是实际上，在CommonJS中上述代码的处理方式是这样的

```js
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

也就是说，为了使用`fs`中的`stat`、`exists`、`readFile`方法，在代码执行时必须把`fs`整个模块全部加载进来，生成一个对象`_fs`，然后再从这个对象上面读取3个方法，这种加载被称为“运行时加载”，因为只有运行时才能得到这个对象。

而es6模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，从这个角度上来看，es6的模块化效率要比CommonJS高得多。阮一峰大神在文档中还列举了一些静态加载的其他优点，但是本菜b并不能看懂╮(╯▽╰)╭

> **新的思考**：`fs`是node.js的核心模块，为什么es6的模块化语法能够生效，在ws中通过文件定位，发现node.js的核心模块代码全是用ts写的，但是由于对ts语法不太熟悉，无法理解ts是如何能够做到既兼容CommonJS又兼容es6的。