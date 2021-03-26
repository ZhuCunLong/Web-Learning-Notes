# React

## 创建第一个React项目

### 老方法

全局安装React脚手架

```shell
npm install -g create-react-app
```

利用脚手架创建项目

```shell
create-react-app xxxx
```

### 官网文档方法

通过npx安装

```shell
npx create-react-app my-app
```

这种方法不需要安装其他东西，只要有node环境即可创建项目

> **注意**
>
> 第一行的 `npx` 不是拼写错误 —— 它是 [npm 5.2+ 附带的 package 运行工具](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)。

## 目录结构

index.js

![1564976252669](assets/1564976252669.png)

组件名称**必须**要大写，引入的`React`模块会解析

## JSX语法

允许在js代码中使用html的语法结构

通常情况下JSX表达式会使用`()`包裹起来

从理解上，一个标签即为一个jsx对象，与vue`<template></template>`模板要求类型，一个组件中的jsx只能包含一个根标签。也就是只能有一个最高级别的jsx对象

```jsx
class Todo extends React.Component {
  render() {
    return (
      <div>第一个根jsx</div>
      <div>第二个根jsx</div>
    )
  }
}
```

上面这段代码中，此种写法是不合法的。

应改为：

```jsx
class Todo extends React.Component {
  render() {
    return (
      <div>
        <div>第一个根jsx</div>
        <div>第二个根jsx</div>
      </div>
    )
  }
}
```

但是这种无意义的div显然让这个代码看起来不怎么舒服，那么就可以可以使用这种方法，使用`<React.Fragment>`标签

```jsx
class Todo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>第一个根jsx</div>
        <div>第二个根jsx</div>
      </React.Fragment>
    )
  }
}
```

### 在JSX中嵌入表达式

- 变量

  ```jsx
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;
  ```

- 函数表达式

  ```jsx
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };
  
  const element = (
    <h1>
      Hello, {formatName(user)}!
    </h1>
  );
  ```

- jsx嵌套调用

## State

有点类型vue中的data属性

react中是没有双向绑定的，并且，修改state属性中的值不能通过`this.state`直接修改，必须通过setState()方法来进行修改

```jsx
export calss MyInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  render(){
    return (
      <input onChang={this.handleChange}/>
    )
  }
  
  handleChange(e){
    this.setState({
      input: e.target.value
    })
  }
}
```

## 组件通信

### 父传子

通过props属性传递

```jsx
// 父组件
export default class Father extends React.Component {
  this.state = {
    title: '我是你爹'
  }
  render(){
    return (
      <Son title={this.state.title}/>
    )
  }
}
// 子组件
export default class Son extends React.Component {
  render(){
    return <p>{this.props.title}</p>
  }
}
```

### 子传父

通过事件传递

```jsx
// 父组件
export default class Father extends React.Component {
  this.state = {
    title: '我是你爹'
  }
  render(){
    return (
      <div>
        {this.state.title}
      	<Son getTitle={this.handleGetTitle.bind(this)}/>
      </div>  
    )
  }

	handleGetTitle(title) {
    this.setStete({
      title: title
    })
  }
}

// 子组件
export default class Son extends React.Component {
  
  render(){
    return <button onClick={this.onClck.bind(this)}>这是子组件按钮</button>
  }
  
  onClick(){
    this.props.getTitle('歪歪歪，我是儿子')
  }
}
```

# redux

安装依赖redux和react-redux

```shell
npm install redux react-redux -S
```

## 三大对象

### Store

存放数据的容器

```js
import { createStore } from 'redux';
const store = createStore(fn);
```

### State

某个时刻的数据

当前时刻的 State，可以通过`store.getState()`拿到。

```js
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

> 代码中的fn即为后面会讲到的Reducer

### Action

改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

上面代码中，Action 的名称是`ADD_TODO`，它携带的信息是字符串`Learn Redux`。

- 使用技巧

封装一个函数创建这样的action对象

```javascript
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```

## 工作流

### store.dispatch()

store发出更新state的请求

```javascript
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

上面代码中，`store.dispatch`接受一个 Action 对象作为参数，将它发送出去。

结合 Action Creator，这段代码可以改写如下。

```javascript
store.dispatch(addTodo('Learn Redux'));
```

### Reducer

store.dispatch()只是发出更新state的申请，实际更新state中的值还需要依赖Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```javascript
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

下面给出demo

```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```

上面代码中，`reducer`函数收到名为`ADD`的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际应用中，Reducer 函数不用像上面这样手动调用，**`store.dispatch`方法会触发 Reducer 的自动执行**。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入`createStore`方法。

```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
```

> 为什么这个函数叫做 Reducer 呢？因为它可以作为数组的`reduce`方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```javascript
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3
```

上面代码中，数组`actions`表示依次有三个 Action，分别是加`0`、加`1`和加`2`。数组的`reduce`方法接受 Reducer 函数作为参数，就可以直接得到最终的状态`3`。

> 这里的store中只存放了一个数值类型，其实可以是一个具体的对象，包含各种key-value

#### 纯函数

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数
- 不能调用系统 I/O 的API
- 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，**Reducer 函数里面不能改变 State**（这一点和React是相吻合的），必须返回一个全新的对象，请参考下面的写法。

```javascript
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

### store.subscribe()

Store 允许使用`store.subscribe`方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

显然，只要把 View 的更新函数（对于 React 项目，就是组件的`render`方法或`setState`方法）放入`listen`，就会实现 View 的自动渲染。

`store.subscribe`方法返回一个函数，调用这个函数就可以解除监听。

```javascript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

这个方法用来更新视图

### 总结

![img](assets/bg2016091802.jpg)

