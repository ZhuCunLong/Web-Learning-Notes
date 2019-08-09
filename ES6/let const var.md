# let const var 区别

## 变量提升

```js
console.log(obj)  // undefined
var obj = 1
```

使用关键字`var`声明的变量有“变量提升”这个概念，变量提升意味着变量可以先使用，在声明，但是在声明的时候初始化是没有用的，所以上面的结果中，`obj`打印的结果是`undefined`

与let和const的区别

```js
console.log(obj1)  // ReferenceError:obj1 is not definde
let obj1

console.log(obj2)  // ReferenceError:obj1 is not definde
const obj2 = 1
```

直接报错

## 作用域？

```js
var a = 1;
let c = 3;
const obj = {
  a: 2,
  c: 4,
  b: function(){
    console.log(this.a)
    console.log(this.c)
  }
}
const fun = obj.b;
fun()
```

> 上面代码在浏览器环境下，测出来的结果是1 undefined，node环境是undefined undefined

