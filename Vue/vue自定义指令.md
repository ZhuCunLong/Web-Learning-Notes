# vue自定义指令

[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

## 作用

自定义指令为什么存在？官方文档给出的原因如下

>...在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。...

对普通dom元素进行底层操作！有点振聋发聩的意思，我们所熟知的vue指令包含了v-if,v-show,v-for,v-model,v-bind，v-on等等，如果再往下想一层，这些指令无一不是在帮我们操作底层的dom。

- v-if，删除/新增dom节点

- v-show，给dom元素添加/删除内联样式`style="display: none"`
- v-for，循环添加dom节点
- v-model，更新dom节点数据（除此之外，非dom相关的，操作视图更新绑定数据）
- v-bind，更新dom节点数据
- v-on，给dom元素添加事件监听

所以指令的使用场景也很明确了，**当你需要操作dom的时候，不妨想想能不能使用自定义指令**

写到这里的时候，脑海中立马想到一个场景，echarts初始化！那么继续探索一下自定义指令的使用来看看是否能通过自定义指令来更为优雅的实现echarts初始化

## 注册方式

- 全局注册

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

- 组件中局部注册

```js
export default {
  name: '',
  data(){
    return {
    }
  },
  ...
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
	}
  ...
}
```

然后你可以在模板中任何元素上使用新的 `v-focus` property，如下：

```vue
<input v-focus/>
```

需要注意的是，在注册自定义指令时，指令名称并不需要写`v-`

**如果在局部和全局都设置了相同的指令，会以局部设置为准**

## 钩子函数

如何告知浏览器我们希望何时希望调用我们通过指令实现的方法，那就是通过钩子函数，自定义指令目前提供了以下五种钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- binding的value值发生变化时，会触发
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。
  - 所在组件被销毁时，会被调用

## 钩子函数参数

在了解了钩子函数之后，再来了解一下钩子函数的参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。

- binding：一个对象，包含以下 property：
  
- `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
- `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
  
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

以下面的代码为例，

```vue
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

页面上展示的结果为：

![image-20210118112541263](assets/image-20210118112541263.png)

# vue自定义指令实现echarts初始化

在vue中引用echarts，panjiachen的[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)已经给出了最佳实践，一个图表封装成一个组件，并通过mixin混入窗口大小重置时的图表resize事件。

那么如果想通过自定义指令来实现echarts的初始化，有以下几点需要注意

## 钩子函数的选择

- bind首先排除，bind的触发时机早于dom插入文档，这个时候连ehcarts实例都无法有效的初始化，无法有效的渲染图表

- 然后是inserted，这个时候满足了dom插入的条件，如果是通过静态数据来渲染图表，在inserted中足以实现echarts的渲染，实际项目中，图表数据往往是通过后端异步获取的，根据浏览器的事件循环机制，这时拿到的option可能是没有数据的，或者根本没有option，这和具体的代码实现有关
- 最优选择是update，当指令传入的binding值发生变化时，会触发，那么将option作为binding的内容传入，当option发生变化时，开始ehars的初始化即可

代码如下：

```js
import Vue from 'vue'
// echarts5只能使用require引入？
const echarts = require('echarts')
Vue.directive('echarts', {
  inserted: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
    }
  },
  update: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
    }
  }
})
```

## ehcarts resize解决方案

### 通过vnode参数操作vue实例属性

可以看到，上述的实现中，不同于一般的在vue中初始化实例，ehchats的实例在钩子函数中生成，也就是vue实例中没有保存ehcarts实例的引用，但是想在使用了`v-echarts`的vue组件中挂载生成的echarts实例也不是不可以，钩子函数的第三个参数vnode传入了指令所在元素的虚拟dom，该对象上有一个属性context，可以获取使用自定义指令所在的vue component，也就是可以使用下面这种方式

```js
import Vue from 'vue'
// echarts5只能使用require引入？
const echarts = require('echarts')
Vue.directive('echarts', {
  inserted: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
      const context = vnode.context
      context.chart = myChart
    }
  },
  update: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
      const context = vnode.context
      context.chart = myChart
    }
  }
})
```

在myEchartsComponent.vue中可以这样使用

```js
<template>
  <div>
    <div class="echarts-demo" v-echarts="option"></div>
  </div>
</template>

<script>
export default {
  name: 'Ldirective',
  created () {
    setTimeout(() => {
      this.option = {
        title: {
          text: '第一个 ECharts 实例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }, 100)
  },
  data () {
    return {
      option: null,
      chart: null
    }
  }
}
</script>

<style scoped lang="less">
.echarts-demo{
  width: 100%;
  height: 500px;
}
</style>

```

但是这种感觉会非常奇怪，因为在data中加入一个属性只是为了在指令执行的时候需要使用，开发者并不显式的在vue实例中操作该属性，然后通过在组件中加入混入的方式，来实现窗口resize时图标resize，那使用指令就显得极其鸡肋了，和[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)项目没有太大的区别。指令最方便的使用应该是只提供指令所需的数据，它应该让开发者关注指令在使用时所传入的表达式，而不用去理会后面的处理逻辑，这种做法导致了开发者在使用这个指令时，必须在data返回的对象中加入charts属性，可能文档里面会说“该属性用于保存该组件中初始化的ehcarts实例，你可能会需要用到它”，如果是我只会觉得这个指令真的垃圾，所以这样的解决方案是不能接受的。

### 在指令中完成事件绑定

首先需要实现一个ResizeHandler类

```js
class ResizeHandler {
  constructor (chart) {
    this.$_resizeHandler = null
    this.chart = chart
  }

  initListener () {
    this.$_resizeHandler = debounce(() => {
      this.resize()
    }, 1000)
    window.addEventListener('resize', this.$_resizeHandler)
  }

  destroyListener () {
    window.removeEventListener('resize', this.$_resizeHandler)
    this.chart.dispose()
    this.chart = null
  }

  resize () {
    const { chart } = this
    chart && chart.resize()
  }
}
```

构造函数接收一个ehcarts实例对象

下面来重写v-echarts指令

```js
Vue.directive('echarts', {
  inserted: (el, binding, vnode) => {
    if (binding.value.option) {
      // 创建新的resizeHandler操作类
      const myChart = echarts.init(el)
      myChart.setOption(binding.value.option)
      const resizeHandler = new ResizeHandler(myChart)
      resizeHandler.initListener()
      vnode.context[`$${binding.value.id}ResizeHandler`] = resizeHandler
    }
  },
  update: (el, binding, vnode) => {
    // 已经初始化过,当option更新时只需要重新调用setOption方法初始化图表
    if (vnode.context[`$${binding.value.id}ResizeHandler`]) {
      if (binding.value.option) {
        const resizeHandler = vnode.context[`$${binding.value.id}ResizeHandler`]
        resizeHandler.chart.setOption(binding.value.option)
      }
    } else if (binding.value.option) {
      // 非首次初始化，创建新的resizeHandler操作类
      const myChart = echarts.init(el)
      myChart.setOption(binding.value.option)
      const resizeHandler = new ResizeHandler(myChart)
      resizeHandler.initListener()
      vnode.context[`$${binding.value.id}ResizeHandler`] = resizeHandler
    }
  },
  unbind: (el, binding, vnode) => {
    vnode.context[`$${binding.value.id}ResizeHandler`] && vnode.context[`$${binding.value.id}ResizeHandler`].destroyListener()
  }
})
```

改变了binding传入的参数类型

使用方法如下：

```vue
<template>
  <div>
    <div class="echarts-demo" v-echarts="{option: option, id: 'first'}"></div>
    <div class="echarts-demo" v-echarts="{option: option1, id: 'second'}"></div>
  </div>
</template>
```

可以看到这里将指令传入的值由原来的option修改为了一个带id的对象，带id是为了防止当一个vue组件需要多个ehcarts图表时，在vue指令中可以通过在组件实例中绑定不同的属性名，并且不用在组件的data方法中显式地声明，最重要的是，在unbind钩子函数执行（组件销毁）时，能够知道销毁的是哪一个ehcarts的resizeHandler实例对象，那么到这个地方，echarts的vue指令实现版已经完成，可以发现，相比[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)项目，将resize事件和echarts销毁全部放在了指令中实现，只需要修改option就可以实现echarts的初始化

