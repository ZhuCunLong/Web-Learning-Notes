# 虚拟dom原理及diff算法

## 什么是虚拟dom

Virtual Dom，简称vdom，指的是用JS模拟的DOM结构，将DOM变化的对比放在JS层来做。换而言之，vdom就是JS对象。 

```html
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```

映射成虚拟dom：

```js
var element = {
  tagName: 'ul', // 节点标签名
  props: {    // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}
```

## 虚拟dom的一般流程



## 为什么需要虚拟dom

单纯的因为快？

**观点一：**操作dom代价太大，虚拟dom作为操作真实dom的缓冲层，配以强大的算法，尽量少地操作dom

> 创建一个DOM的消耗是非常惊人，目前，在浏览器中存在四种形态的对象
>
> 1. 超轻量 Object.create(nulll)
> 2. 轻量   一般的对象 {}
> 3. 重量    带有访问器属性的对象, avalon或vue的VM对象
> 4. 超重量 各种节点或window对象
>
> 然后频繁访问或创建 3，4种形态的对象是很不明智的。但VM对象能为编程带来极好的用户体验，因此这个代价是可以接受的。

**观点二：**因为框架的原因在普适性与性能中的折中选择

尤雨溪关于虚拟dom在不同场景下的的性能表现



在这个基础上，react的实现做的应该是比大多数的框架要好得多，本身相对其他MVVM框架或者类MVVM框架来说，更为轻量，更为专注于视图

## 具体实现

diff函数

```js
// diff 函数，对比两棵树
function diff (oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
  // 对比oldNode和newNode的不同，记录下来
  // 
  patches[index] = [...]
  diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches) {
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
    leftNode = child
  })
}
```

patch类型

```js
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3
```

替换

```js
patches[0] = [{
  type: REPALCE,
  node: newNode // 全新vdom结构
}]
```

属性

```js
patches[0] = [{type: REPALCE,node: newNode}, 
              {type: PROPS,props: {id: "container"}}]
```

文本

```js
patches[2] = [{
  type: TEXT,
  content: newText
}]
```

重排

```js
patches[0] = [{
  type: REORDER,
  moves: [{remove or insert}, 
          {remove or insert},
          ...]
}]
```



# 参考



# 参考

vue核心之虚拟DOM(vdom) https://www.jianshu.com/p/af0b398602bc 

面试官问: 如何理解Virtual DOM？ https://zhuanlan.zhihu.com/p/79408137 

 网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？ - 知乎 https://www.zhihu.com/question/31809713 

 如何理解虚拟DOM? - 知乎 https://www.zhihu.com/question/29504639 

