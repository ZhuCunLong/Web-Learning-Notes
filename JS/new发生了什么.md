# new发生了什么

1. 新生成了一个对象
2. 链接到原型
3. 绑定 this，执行构造函数
4. 返回新对象

常规来讲，好像没什么问题，看看下面这个例子

``` js
function foo(){
  console.log('this is ' + this.a)

  const obj = {
    a:1
  }
  return obj
}
foo.prototype.b=function (){
  console.log(this.a);
}
const f1 = new foo()
console.log(f1.a); // 1
f1.b() //TypeError f1.b is not a function
```

首先我们需要知道一点，new 前缀会改变return 语句的行为,如果return 的值是对象，那么将会将这个对象返回，否则将返回默认创建的新对象。

如果构造函数有return语句，并且不是`return this`，而是一个全新的对象

分析上面的代码，我们会发现步骤2的顺序似乎有些问题，因为上述例子中返回对象的继承自Object而非foo，调试中发现`f1`的`Construtor`是`Object()`而非`foo()`

综上，结论是如果构造函数中包含return语句，常规步骤顺序可能有误