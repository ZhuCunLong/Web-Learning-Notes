# class

## 基本用法

```js
class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  toString(){
    return `(${this.x},${this.y})`
  }
}

const p1 = new Point(1,1)
console.log(p1);
```

需要注意的点，`Point`的本质可以认为是es5中的构造函数

```js
typeof Point // “function”
Point === Point.prototype.constructor // true
```

## 与ES5的异同

### prototype（同）

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

上面的基本用法中在es5的方式中等同于

```js
Point.prototype = {
  constructor(){},
  toString(){},
}
```

### 方法不可枚举（异）

```js
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

与es5不同的地方在于，es5中`prototype`属性上的方法除了`constructor`外都是可枚举的

### 不存在提升

```js
new Foo(); // ReferenceError
class Foo {}
```

**为什么es6不像es5一样把class的声明提升到头部呢？**

>我会认为是`let`”背锅“，因为let导致es6认为class不应该提升
>
>```js
>let Foo = class {};
>class Bar extends Foo {
>}
>```
>
>这本来是一段不会报错的代码，但是如果class能够提升，注意重点来了，第二个class Bar会被提升到头部，但是let是没有属性提升的，也就是说编译器首先初始化Bar，由于Bar继承自Foo，而由于let的缘故，Foo还没有初始化，会导致编译器找不到Foo的定义。为了防止这种错误，ES6不允许class提升。