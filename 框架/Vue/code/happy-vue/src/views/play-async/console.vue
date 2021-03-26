<template>
  <div class="console">
    <el-button size="mini" @click="handleClear">清空</el-button>
    <div v-for="(item,index) in message"
      :key="index">
      <span
        :style="item.type===ERROR ? {color: 'red'}:null">
        {{`${item.type===ERROR ? 'exception:  ': ''}${item.msg}`}}
      </span>
    </div>
  </div>
</template>

<script>
import { ERROR } from '@/views/play-async/constant'

export default {
  name: 'Console',
  props: {
    message: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      ERROR
    }
  },
  methods: {
    handleClear () {
      this.$emit('update:message', [])
    }
  }
}
</script>

<style scoped lang='less'>
.console{
  background: #97a8be;
  padding: 10px;
  height: 100%;
}
</style>
