[TOC]

rxjs教程指路[中文手册](https://cn.rx.js.org)

# Rxjs异步数据流编程

个人理解，异步编程，类`Promise`，功能比`Promise`更强大

## 各异步编程语法比较

- 回调函数

```js
function getcallbackData(callback) {
  setTimeout(() => {
    const data = 'data-callback';
    callback(data);
  }, 1000);
}

getcallbackData((data) => {
  console.log(data)
})
```

- Promise

```js
function getPromiseData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = 'data-Promise'
      resolve(data)
    }, 2000)
  })
}

getPromiseData().then((data) => {
  console.log(data);
})
```

- rxjs

```js
function getRxjsData() {
  return new Observable((observer) => {
    setTimeout(() => {
      const data = 'data-Rxjs'
      observer.next(data)
    }, 3000)
  })
}

getRxjsData().subscribe((data) => {
  console.log(data)
})
```

从上面可以看出，rxjs与promise的语法非常相似，rsxj使用的对象是Observable，获取数据使用的关键字是subscribe（订阅）

## 相比Promise的优势

什么叫优势，你能做的我能做，做的好不好暂且不谈，但是我能做的你做不了，这就是优势了

### Rxjs unsubscribe 取消订阅

Promise创建之后，动作是无法撤回的。Observable不一样，动作可以通过unsbscribe()方法中途撤回，而且Observable在内部做了智能的处理。举例如下

```js
function getRxjsData() {
  return new Observable((observer) => {
    setTimeout(() => {
      const data = 'data-Rxjs'
      observer.next(data)
    }, 3000)
  })
}

const res = getRxjsData().subscribe((data) => {
  console.log(data)
})
setTimeout(() => {
  res.unsubscribe(); // 取消订阅
}, 1000)



// 不会打印输出结果
```

### Rxjs 订阅后多次执行

如果我们想让异步里面的方法多次执行，比如下面这段代码

```js
function getIntervalPromiseData() {
  return new Promise((resolve) => {
    setInterval(() => {
      const data = 'Intervaldata-Promise'
      resolve(data)
    }, 2000)
  })
}

getIntervalPromiseData().then((data) => {
  console.log(data);
})
```

结果`promsie`中的数据只能打印一次，而`Observable`不一样，它可以不断地触发下一个值，就像`next()`这个方法的名字所暗示的那样。

```js
function getIntervalRxjsData() {
  let count = 0;
  return new Observable((observer) => {
    setInterval(() => {
      count++
      const data = 'Intervaldata-Rxjs' + count
      observer.next(data)
    }, 1000)
  })
}

getIntervalRxjsData().subscribe((data) => {
  console.log(data)
})

//打印结果
// Intervaldata-Rxjs1
// Intervaldata-Rxjs2
// Intervaldata-Rxjs3
// ······
```

### Rxjs 工具函数

在`angular`中使用rxjs的相关工具函数需要引入相关的模块

```js
import { map, filter } from 'rxjs/operators'
```

- `filter`

```js
function getIntervalRxjsNum() {
  let count = 0;
  return new Observable((observer) => {
    setInterval(() => {
      count++
      observer.next(count)
    }, 1000)
  })
}

getIntervalRxjsNum().pipe(
  filter((value: number) => {
    return value % 2 === 0
  })
).subscribe((data) => {
  console.log(data)
})

// 打印结果
// 2
// 4
// 6
// ···
```

`filter`的作用是过滤订阅的数据，上例中，只获取偶数 

- map

```js
getIntervalRxjsNum().pipe(
  map((value: number) => {
    return value * value
  })
).subscribe((data) => {
  console.log(data)
})

// 打印结果
// 1
// 4
// 9
// ···
```

与js中数组方法`map`类似，可以对数据进行修改

- 复合使用map和filter

```js
getIntervalRxjsNum().pipe(
  filter((value: number) => {
    return value % 2 === 0
  }),
  map((value: number) => {
    return value * value
  })
).subscribe((data) => {
  console.log(data)
})

// 打印结果
// 4
// 16
// 36
// ···
```

工具函数都是在`pipe`管道中使用的，有点类似`angular`中的模板语法