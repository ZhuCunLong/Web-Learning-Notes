<template>
  <div>
    <div v-show="show" v-ellipsis>vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令
      vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令vue指令{{input1}}</div>
    <el-input v-model="input1" v-focus/>
    <el-input v-focus/>
    <el-button type="primary" size="mini" @click="handleClick">确定</el-button>
    <div class="echarts-demo" v-echarts="option"></div>
    <div class="echarts-demo" v-echarts="option1"></div>
  </div>
</template>

<script>
export default {
  name: 'Ldirective',
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el, binding, vnode) {
        el.focus()
      }
    },
    demo: {
      inserted: (el, binding) => {
        console.log(binding.value)
      },
      update: (el, binding) => {
        console.log(binding.value)
      }
    }
  },
  created () {
    setTimeout(() => {
      this.option = {
        title: {
          text: '第一个 ECharts 实例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.option1 = {
        title: {
          text: '第二个 ECharts 实例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 100]
        }]
      }
    }, 100)
  },
  data () {
    return {
      input1: '',
      show: false,
      option: null,
      option1: null,
      demo: '测试',
      resizeHandler: null
    }
  },
  methods: {
    handleClick () {
      this.demo = 'change'
    }
  }
}
</script>

<style scoped lang="less">
.echarts-demo{
  width: 100%;
  height: 500px;
}
</style>
