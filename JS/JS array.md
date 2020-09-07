# js Array

## 修改器方法

修改器方法都会影响原数组

### push（末尾添加）

**功能**：  数组末尾添加任意数量的元素

**返回值**：新数组的长度

**形参**：以逗号隔开需要添加的item

**是否影响原数组**：是

```js
const arr = ['a', 'b', 'c']
let count = arr.push('d')
console.log(count)   // 4
console.log(arr) // a b c d
count = arr.push('e','f')
console.log(count)   // 6
console.log(arr) // a b c d e f
```

### pop（末尾删除）

**功能**：  移除数组末尾最后一项

**返回值**：移除项

**形参**：无

**是否影响原数组**：是

```js
const arr = ['a', 'b', 'c']
const item = arr.pop()
console.log(item)  // c
console.log(arr)  // a b
```

### unshift（头部添加）

**功能**：与push相对，从数组开头添加新的任意数量的元素

**返回值**：新数组的长度

**形参**：以逗号隔开需要添加的item

**是否影响原数组**：是

```js
const arr = ['a', 'b', 'c']
let count = arr.unshift('d')
console.log(count)   // 4
console.log(arr) // d a b c
count = arr.unshift('e','f')
console.log(count)   // 6
console.log(arr) // e f d a b c
```

### shift（头部删除）

**功能**：与pop相对，删除数组中第一个元素

**返回值**：移除项

**形参**：无

**是否影响原数组**：是

```js
const arr = ['a', 'b', 'c']
const item = arr.shift()
console.log(item)   // a
console.log(arr)    // b c
```

### fill（填充数组）

**功能**： 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。 

**返回值**：修改后的数组

**形参**：

value：必选，用来填充数组元素的值

start：可选，起始索引，默认值为0

end：可选，终止索引，默认值为this.length

**是否影响原数组**：是

```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]

// 妙用，初始化一个初始值为0，任意长度的数组，可以用于笔试题中初始化数组，妙啊！
Array(3).fill(0);                // [0, 0, 0]
// 这个方法要稍微差一点，返回的对象其实是一个类数组，并不是真实的数组，但是这个思路也非常巧妙
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```

### reversse(数组反转)

**功能**：  方法将数组中元素的位置颠倒，并返回该数组 

**返回值**：颠倒后的数组

**形参**：无

**是否影响原数组**：是

```js
const a = [1, 2, 3];
console.log(a); // [1, 2, 3]
a.reverse(); 
console.log(a); // [3, 2, 1]
```



| 函数名              | 功能                                                         | 返回值             | 是否影响原数组     |
| ------------------- | ------------------------------------------------------------ | ------------------ | ------------------ |
| push                | 数组末尾添加任意数量的元素                                   | 数组长度           | 是                 |
| pop                 | 数组末尾移除最后一项，减少数组的 length 值                   | 移除的item         | 是                 |
| shift               | 删除原数组第一项                                             | 移除的item         | 是                 |
| unshift             | 数组开头添加任意数量的元素                                   | 数组长度           | 是                 |
| sort                | 按升序排列数组（基于字符串的升序）                           | 排序后的数组       | 是                 |
| reverse             | 反转数组项的顺序                                             | 反转后的数组       | 是                 |
| concat              | 将参数添加到原数组中(1、用于拷贝数组副本，什么参数也传；2、连接两个数组，有点类似push的功能) | 返回新数组         | **否**             |
| join(separator)     | 将数组的元素组起一个字符串，以separator为分隔符              | 返回连接后的字符串 | **否**             |
| slice               | 截取数组                                                     | 返回截取后的数组   | **否**             |
| indexOf/lastIndexOf | 从数组开头和结尾查找对应元素的索引                           | 参数的索引值       | **否**             |
| forEach             | 遍历数组，参数为函数类型，偶默认参数分别为value，index，arr本身 | 无                 | **取决于具体功能** |
| map                 | 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。 | 运算后的数组       | **否**             |

遍历数组可以使用for of

```js
const arr = [{
    name: 'a',
    age: 15
}, {
    name: 'b',
    age: 15
}]
for(const item of arr){
    console.log(item.name)
}
// a b
```

## 非原型方法

不在Array原型链上的方法，即不能通过实例调用，也无所谓是否会改变原数组

### isArray

**功能**：用于确定传递的值是否是一个 Array

**形参**：判断对象

**返回值**：true：是数组，false：不是数组

```js
Array.isArray([1, 2, 3]) // true
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype) // true
```

### from

**功能**： 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。 

**形参**：

arrayLike：必选。想要转换成数组的伪数组对象或可迭代对象。

mapFn：可选。如果指定了该参数，新数组中的每个元素会执行该回调函数。

thisArg ：可选。 可选参数，执行回调函数 `mapFn` 时 `this` 对象。 

**返回值**：一个新的数组实例

```js
// 回调函数的第一个参数为类数组的value，第二个参数为索引值
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

