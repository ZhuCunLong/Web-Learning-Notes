import Vue from 'vue'

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
