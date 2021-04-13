import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import { addClass, on, myDebounce, debounce, throttle } from '@/utils'

const echarts = require('echarts')

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
    this.$_resizeHandler = debounce(() => {
      console.log('看看触发了多少次')
      this.resize()
    }, 200)
    window.addEventListener('resize', this.$_resizeHandler)

    this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
  }

  destroyListener () {
    window.removeEventListener('resize', this.$_resizeHandler)
    this.$_resizeHandler = null

    this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  }

  resize () {
    const { chart } = this
    chart && chart.resize()
  }
}

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
