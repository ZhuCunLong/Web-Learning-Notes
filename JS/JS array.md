# js Array

## 修改器方法

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

