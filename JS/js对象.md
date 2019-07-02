# js对象

## 对象键值获取

- `for ... in`

  ```js
  const zcl = Symbol('zcl')
  const obj = {
  	a:'a',
  	b:'b',
  	c:'c',
  	d:() => console.log('hi'),
  	e(){
  		console.log('hi e')
  	},
  	f:function () {
  		console.log('hi f')
  	},
  	[zcl]:'i am zcl'
  }
  
  Object.defineProperty(obj, 'g', {
    enumerable: false,
    value:  function () {
      console.log('hi g')
    },
  });
  
  for(let key in obj){
    console.log(key)
  }
  
  `a
  b
  c
  d
  e
  f`
  ```
  
- `for...of`(**es6**)

  > 普通对象不能使用`for...of`

- `Object.keys()`

  返回一个数组，数组中的项就是**对象上已定义(可枚举)的属性名和方法名**

  ```js
  console.log(Object.keys(obj))
  
  `[ 'a', 'b', 'c', 'd', 'e', 'f' ]`
  ```

- `Object.getOwnPropertyNames()`

  返回一个数组，数组中的项就是对象上已定义的属性名和方法名(**包括不可枚举属性但不包括Symbol值作为名称的属性**)

  ```js
  console.log(Object.getOwnPropertyNames(obj))
  
  `[ 'a', 'b', 'c', 'd', 'e', 'f', 'g']`
  ```

  > 与Object.keys()方法的区别是可以返回不可枚举的属性

- `Reflect.ownKeys(obj)`(**es6**)

  返回一个数组，数组中的项就是对象上已定义的属性名和方法名(**包括不可枚举属性和Symbol值作为名称的属性**)

  ```js
  console.log(Reflect.ownKeys(obj))
  
  `[ 'a', 'b', 'c', 'd', 'e', 'f', 'g', Symbol(zcl) ]`
  ```

  > 除了枚举属性还能返回symbol类型的数据

