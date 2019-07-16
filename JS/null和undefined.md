# null和undefined的恩怨纠葛

- undeined值是派生自null的

```js
console.log(null == undefined)  // true
console.log(null === undefined)  // false
```

- unll值表示一个空对象指针

unll是一个对象

```js
console.log(typeof null) // object
console.log(typeof undefined) // undefined
```

- undefine产生的时机

实际上null除了赋值之外，其他时候，对象不能为null，但是undefined不一样，在某些情况下，会自动产生

```js
var temp;
console.log(temp);     // undefined
console.log(typeof temp);   // undefined
console.log(typeof temp2);  // undefined
console.log(temp==undefined);  // ture
console.log(temp2==undefined);  // ReferenceError:obj1 is not definde
```

```js
function foo(val1,val2){
  console.log(val2)  // undefined
}

foo(1)
```

```js
var obj = {
  a: 'hello'
  b: function(){
    console.log(this.a)
  }
}

console.log(obj.c) // undefined
console.log(obj.c())  // TypeError: obj.c is not a function
```

