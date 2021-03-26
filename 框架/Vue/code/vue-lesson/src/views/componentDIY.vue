<template>
  <div>
    <h1>k-input实现v-model</h1>
    {{ msg }}
    <k-input v-model="msg"></k-input>
    <hr/>
    <h1>表单项</h1>
    <k-form-item label='用户名'>
      <k-input v-model="name"></k-input>
    </k-form-item >
    <el-input v-model="msg"></el-input>
  </div>
</template>

<script>
import KInput from '../components/Form/KInput';
import KFormItem from '../components/Form/KFormItem'
export default {
  name:'componentDIY',
  components:{
    KInput,
    KFormItem
  },
  data () {
    return {
      msg: 'hello vue',
      name: 'zcl'
    }
  },
  methods: {
  }
}
</script>

<style scope>
</style>