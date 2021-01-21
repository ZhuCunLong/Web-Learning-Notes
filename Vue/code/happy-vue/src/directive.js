import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import { addClass, on, myDebounce, debounce, throttle } from '@/utils'
const echarts = require('echarts')

const hover = e => {
  const t = e.target
  t.title = t.clientWidth < t.scrollWidth ? t.innerText : ''
}

Vue.directive('focus', {
  bind: (el) => {
    console.log('全局注册')
  },
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.directive('ellipsis', {
  bind: function (el, binding) {
    addClass(el, 'l-ellipsis')
    on(el, 'mouseenter', hover)
  },
  update: function (el) {
    // console.log(el)
  }
})

class ResizeHandler {
  constructor (chart) {
    this.$_sidebarElm = null
    this.$_resizeHandler = null
    this.chart = chart
  }

  $_sidebarResizeHandler = e => {
    if (e.propertyName === 'width') {
      this.$_resizeHandler()
    }
  }

  initListener () {
    this.$_resizeHandler = throttle(() => {
      console.log('看看触发了多少次')
      this.resize()
    }, 1000)
    window.addEventListener('resize', this.$_resizeHandler)

    this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
  }

  destroyListener () {
    window.removeEventListener('resize', this.$_resizeHandler)
    this.$_resizeHandler = null

    this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
  }

  resize () {
    const { chart } = this
    chart && chart.resize()
  }
}

Vue.directive('echarts', {
  inserted: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
      const resizeHandler = new ResizeHandler(myChart)
      resizeHandler.initListener()
    }
  },
  update: (el, binding, vnode) => {
    if (binding.value) {
      const myChart = echarts.init(el)
      myChart.setOption(binding.value)
      const resizeHandler = new ResizeHandler(myChart)
      const ctx = vnode.context
      resizeHandler.initListener()
      ctx.resizeHandler = resizeHandler
    }
  },
  unbind: (el, binding, vnode) => {
    vnode.context.resizeHandler.destroyListener()
  }
})
