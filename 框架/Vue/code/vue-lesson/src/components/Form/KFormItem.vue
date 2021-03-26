<template>
  <div>
    <label v-if="label">{{label}}
      <slot/>
    </label>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
export default {
  name:'KFormItem',
  props: {
    label: {// 输入项标签
      type: String,
      default: ''
    },
    prop: {// 字段名
      type: String,
      default: ''
    },
  },
  data () {
    return {
      error: '' // 校验错误
    }
  },
  methods: {
  }
}
</script>

<style scope>
</style>