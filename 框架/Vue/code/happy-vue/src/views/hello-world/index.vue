<template>
  <div>
    happy Vue
    <el-button @click="handleClick">防抖按钮</el-button>
    <el-button @click="handleClick">箭头函数版防抖按钮</el-button>
  </div>
</template>

<script>
import { debounce, vueDebounce } from '@/utils'
export default {
  name: 'HelloWorld',
  data () {
    return {
      testName: '123'
    }
  },
  methods: {
    /* 这里不能用箭头函数，因为这个debounce的实现使用了apply，
    而apply方法对箭头函数并没有作用
    如果使用箭头函数，由于对象不构成单独的作用域，所以this应该是全局作用域，
    也就是如果是在浏览器环境应该是window？不对。。。
    这个地方确实存疑 */
    handleClick: debounce(function () {
      console.log(this.testName)
    }, 1000, true),
    handleClcikVue: vueDebounce(() => {
      console.log(this.testName)
    }, 1000, true)
  }
}
</script>

<style scoped lang="less">
</style>
