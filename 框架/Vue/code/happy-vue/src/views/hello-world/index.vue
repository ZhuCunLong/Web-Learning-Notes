<template>
  <div>
    happy Vue
    <el-button @click="handleClick">防抖按钮</el-button>
  </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    handleClick: debounce(() => {
      console.log('click')
    }, 1000, true)
  }
}
</script>

<style scoped lang="less">
</style>
