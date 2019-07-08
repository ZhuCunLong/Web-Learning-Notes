# Funcion

## 参数

js中函数的参数会出现以下几种情况

- 普通参数

  ```js
  function add(a,b){
    return a+b;
  }
  ```

- 剩余参数

  ```js
  function add(a,...args){
    return a + args.reduce((previous, current) => {
      return previous + current;
    });
  }
  ```

- 默认参数

  ```js
  function add(a,b=1){
    return a+b;
  }
  ```

### 参数列表对象arguments

`arguments`对象是所有**非箭头**函数中都可用的**局部变量**。你可以使用`arguments`对象在函数中引用函数的参数。

首先要注意的是它是一个对象，而非一个数组，它是一个类数组

```js
function(data){
  console.log(typeof arguments)  // object
}
```

当**非严格模式**中的函数**没有**包含**剩余参数、默认参数**，那么`arguments`对象中的值**会**跟踪参数的值（反之亦然）

```js
function func(a) { 
  arguments[0] = 99;   // 更新了arguments[0] 同样更新了a
  console.log(a);
}
func(10); // 99
```

```js
function func(a) { 
  a = 99;              // 更新了a 同样更新了arguments[0] 
  console.log(arguments[0]);
}
func(10); // 99
```

当**非严格模式**中的函数**有**包含**剩余参数、默认参数**，那么`arguments`对象中的值**不会**跟踪参数的值（反之亦然）。相反, `arguments`反映了调用时提供的参数：

```js
function func(a = 55) { 
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
// 剩余参数
function func1(a,...args){
  arguments[0] = 99;
  console.log(a);
}
func1(10); //10
```

```js
function func(a = 55) { 
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
func(10); // 10
// 剩余参数
function func1(a,...args){
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
func1(10); // 10
```

但是如果在**严格模式下**，不管有没有使用剩余参数和默认参数，`arguments`总是反映调用时提供的参数：

```js
'use strict'

function func(a) { 
  arguments[0] = 99;   
  console.log(a);
}
func(10); // 10

function func(a) { 
  a = 99;             
  console.log(arguments[0]);
}
func(10); // 10
```

