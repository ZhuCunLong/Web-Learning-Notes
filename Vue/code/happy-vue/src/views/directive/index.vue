<template>
  <div>
    <div v-show="show" v-ellipsis>vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令{{input1}}</div>
    <el-input v-model="input1" v-focus/>
    <el-input v-model="input1" v-focus/>
  </div>
</template>

<script>
/* import { addClass, on } from '@/utils'

const hover = e => {
  const t = e.target
  t.title = t.clientWidth < t.scrollWidth ? t.innerText : ''
} */

export default {
  name: 'Ldirective',
  directives: {
    /* ellipsis: {
      bind: function (el, binding) {
        addClass(el, 'l-ellipsis')
        on(el, 'mouseenter', hover)
      }
    }, */
    focus: {
      // 指令的定义
      inserted: function (el, binding, vnode) {
        console.log(vnode)
        el.focus()
      }
    }
  },
  data () {
    return {
      input1: '',
      show: false
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
