<template>
  <div>
    <h1>在data中声明对象</h1>
    <div class="main">
      <div class="main-left">
        <el-button size="mini" @click="handleClick">手动修改checked状态</el-button>
        <my-checkbox :person="person"></my-checkbox>
        <my-checkbox :person="person1"></my-checkbox>
      </div>
      <div class="main-right">
        <h4>数据展示</h4>
        <ul>
          <li>
            <data-label :person="person"/>
          </li>
          <li>
            <data-label :person="person1"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="result">
      <h4>结论</h4>
      <div>1.data中已经声明的对象带属性正常</div>
      <div>2.data中已经声明的对象属性未初始化也正常</div>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/views/play-watch/components/MyCheckbox'
import DataLabel from '@/views/play-watch/components/DataLabel'
export default {
  name: 'PlayWatch',
  components: { DataLabel, MyCheckbox },
  data () {
    return {
      person: {
        name: 'zcl',
        checked: false
      },
      person1: {
        name: 'zyt'
      }
    }
  },
  methods: {
    handleClick () {
      this.person.checked = !this.person.checked
    }
  }
}
</script>

<style scoped lang="less">
@import "./main";
</style>
