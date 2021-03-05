<template>
  <div class="component-a">
    <el-checkbox v-model="person.checked" @change="handleChange">{{ person.name }}</el-checkbox>
    <span style="margin-left: 20px">组件中双绑变量状态：{{person.checked}}</span>
  </div>
</template>

<script>
export default {
  name: 'MyCheckbox',
  props: {
    person: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleChange (val) {
      /* this.person.checked = val */
    }
  }
}
</script>

<style scoped lang="less">
.component-a{
  border: 1px solid seagreen;
}
</style>
