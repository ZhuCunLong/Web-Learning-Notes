<template>
  <div class="container">
    <el-button @click="handleClick(1)">切换类型1</el-button>
    <el-button @click="handleClick(2)">切换类型2</el-button>
    <child-ant-table :tableType="type" :tableData="tableData"/>
  </div>
</template>

<script>
import ChildAntTable from './child-ant-table.vue'
import { data } from './config'

export default {
  name: 'LStaticClass',
  components: { ChildAntTable },
  data () {
    return {
      type: 2,
      tableData: data
    }
  },
  methods: {
    handleClick (type) {
      this.type = type
    }
  }
}
</script>

<style scoped lang="less">
</style>
