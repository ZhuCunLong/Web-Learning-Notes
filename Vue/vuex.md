# Vuex

关键词：

- 集中式状态管理模式
- 响应式

集中式状态管理模式以一个全局**单例模式**管理应用的状态，类似于全局对象，但不完全一样

那么问题来了，什么是单例模式

## 单例模式singleton

[阮一峰es6文档-Symbol](http://es6.ruanyifeng.com/#docs/symbol)第7节中有讲到单例模式，并给出了一个demo

我做出了另一种实现，包含三个js，第一个js命名为state.js，第二个和第三个分别命名为m1.js和m2.js

- state.js

  ```js
  function A() {
  	this.foo = 'hello';
  }
  
  /*if (!global._foo) {
  	global._foo = new A();
  }*/
  
  if(!global._foo) {
  	global._foo = {
  		foo : 'hello'
  	}
  }
  
  module.exports = global._foo;
  ```

- m1.js

  ```js
  const a = require('./state');
  
  a.foo = 'hi';
  ```

- m2.js

  ```js
  var b = require('./m1')
  var a = require('./state')
  
  console.log(a.foo);
  ```

最后运行m2.js，返回结果为'hi'。

为了模拟一个程序中不同模块之间先后的运行情况，在m2中引入了m1，就是为了在执行m2模块时，先执行m1模块中的代码，在m1模块中修改了state模块导出对象的foo属性值，而在m2中再次引入state模块，打印发现对应的属性值发生变化。

纵观整个过程，简直就是没有响应式的vuex。

## 基本用法

在项目中引入vuex

```shell
npm i vuex -S
```

添加store文件夹，在文件夹中添加index.js

```js
// index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  outA: '外部state中的变量a',
  outCount: 0
}

const mutations = {
  EDITA (state, payload) {
    state.outA = payload
  },
  OUTADD (state) {
    state.outCount += 1
  },
  OUTREDUCE (state) {
    state.outCount -= 1
  }
}

const actions = {
  editA ({ commit }, payload) {
    setTimeout(() => {
      commit('EDITA', payload)
    }, 1000)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
```

在组件中使用

```vue
<template>
  <div>
    <h1>基本用法</h1>
    <div>
      <div>外部变量a的值：{{outA}}</div>
      <input v-model="a"/>
      <button @click="handleEditA">修改outA</button>
      <button @click="handleEditA1">异步修改</button>
      <div>
        外部数据count：{{outCount}}
        <button @click="handleAdd">+</button>
        <button @click="handleReduce">-</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageVuex',
  computed: {
    outA () {
      return this.$store.state.outA
    },
    outCount () {
      return this.$store.state.outCount
    }
  },
  data () {
    return {
      a: '',
      b: ''
    }
  },
  methods: {
    handleEditA () { // 修改state中的数据
      this.$store.commit('EDITA', this.a)
    },
    handleEditA1 () { // 使用异步的方式修改state中的数据
      this.$store.dispatch('editA', this.a)
    },
    handleAdd () {
      this.$store.commit('OUTADD')
    },
    handleReduce () {
      this.$store.commit('OUTREDUCE')
    }
  }
}
</script>
```

### 关于mutations和actions

1. mutations和actions中的属性名可以完全相同，并不会影响程序的正常运行，也不会报错
2. mutations中的属性名推荐使用大写
3. acttions中方法的第一个参数是一个包含commit、dispatch等方法或者属性的对象

![1598854541776](assets/1598854541776.png)

4. mutation中可以执行异步修改state中的数据，但是不推荐这么做，不利于追踪state的状态更改
5. actions中方法的第一个参数的包含的state对象，是可以直接操作的，state中的数据也能修改成功，但是也不推荐这么干

## modules

在store文件夹下新建一个modules目录

新建模块文件

```js
// user.js
const state = {
  name: 'zcl',
  age: 25
}

const mutations = {
  UPDATENAME: (state, payload) => {
    state.name = payload
  },
  ADDAGE: state => {
    state.age += 1
  }
}

const actions = {
  updateName ({ commit }, payload) {
    setTimeout(() => {
      commit('UPDATENAME', payload)
    }, 1000)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}
```

在store/index.js中添加modules

```js
// ....省略

const modules = {
  user
}

export default new Vuex.Store({
  state,
  mutations,
  actions，
  modules     // 添加modules
}) 
```

> 1. 在模块的mutations中，**state只能够访问自己模块内的数据**
> 2. 在模块的actions中，可以通过操作第一个参数中的rootGetters和rootState来访问其他模块中的内容

### namespaced

**注意**：modules的mutations和actions中名称是可复用的，这就会造成，如果不同模块中包含相同的mutations和actions名称，那么这些模块中的mutation和action都会触发。为了防止这种情况的产生，vuex提供了namespaced属性

在对应的modules中添加namespaced属性

```js
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

在组件中使用，需要加上对应的模块名称，这样就能防止同时触发不同模块的相同mutation，action同理

```js
methods: {
  handelUpdateName () {
    this.$store.commit('goods/UPDATENAME', 载荷)
  }
}
```

## getters

添加外部文件也可，在index.js或者各自模块中添加也可

```js
// getters.js
const getters = {
  userInfo: (state) => {
    return `我是${state.name}，今年${state.age}岁`
  }
}

export default getters
```

在index.js中引入

```js
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters    // 引入getters
})
```

在和namespaced的联动上，其处理方式和mutations和actions类似

```js
this.$store.getters['user/userInfo'] // 当模块开启namespaced之后这么使用
this.$store.getters.user.userInfo // 这种写法不管如何都会报错
this.$store.getters.userInfo // 当模块未开启namespaced时这么使用
```

