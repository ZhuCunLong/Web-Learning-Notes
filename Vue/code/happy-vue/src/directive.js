import Vue from 'vue'
import { addClass, on } from '@/utils'

const hover = e => {
  const t = e.target
  t.title = t.clientWidth < t.scrollWidth ? t.innerText : ''
}

Vue.directive('focus', {
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
    console.log(el)
  }
})
