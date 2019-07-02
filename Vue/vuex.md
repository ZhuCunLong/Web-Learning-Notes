# Vuex

关键词：

- 集中式状态管理模式
- 响应式

集中式状态管理模式以一个全局**单例模式**管理应用的状态，类似于全局对象，但不完全一样

那么问题来了，什么是单例模式

## 单例模式singleton

[阮一峰es6文档-Symbol](http://es6.ruanyifeng.com/#docs/symbol)第7节中有讲到单例模式，并给出了一个demo

我做出了另一种实现，包含三个js，第一个js命名为state.js，第二个和第三个分别命名为m1.js和m2.js

- state.js

  ```js
  function A() {
  	this.foo = 'hello';
  }
  
  /*if (!global._foo) {
  	global._foo = new A();
  }*/
  
  if(!global._foo) {
  	global._foo = {
  		foo : 'hello'
  	}
  }
  
  module.exports = global._foo;
  ```

- m1.js

  ```js
  const a = require('./state');
  
  a.foo = 'hi';
  ```

- m2.js

  ```js
  var b = require('./m1')
  var a = require('./state')
  
  console.log(a.foo);
  ```

最后运行m2.js，返回结果为'hi'。

为了模拟一个程序中不同模块之间先后的运行情况，在m2中引入了m1，就是为了在执行m2模块时，先执行m1模块中的代码，在m1模块中修改了state模块导出对象的foo属性值，而在m2中再次引入state模块，打印发现对应的属性值发生变化。

纵观整个过程，简直就是没有响应式的vuex。

​																																																																																																																																																																																																																																																				