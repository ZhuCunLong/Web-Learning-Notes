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

