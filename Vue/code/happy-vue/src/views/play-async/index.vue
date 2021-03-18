<template>
  <div style="height: 100%">
    <div class="main">
      <div class="left">
        <el-button @click="handleStart">启动</el-button>
        <el-button @click="handleStart1">启动1</el-button>
        <my-dialog :visible.sync="visible"></my-dialog>
      </div>
      <div class="right">
        <console :message.sync="message"></console>
      </div>
      <div class="result">
        <p>1.当内层函数的异常被捕获之后，外层函数不会继续捕获该异常，除非内层函数没做异常捕获</p>
        <p>2.当在点击事件中唤起弹框时，并不会阻塞点击事件的执行！</p>
      </div>
    </div>
  </div>
</template>

<script>
import MyDialog from '@/views/play-async/my-dialog'
import Console from '@/views/play-async/console'
import { LOG, ERROR } from '@/views/play-async/constant'
import test1Mixin from '@/views/play-async/test1Mixin'

export default {
  name: 'PlayAsync',
  components: { Console, MyDialog },
  mixins: [test1Mixin],
  data () {
    return {
      visible: false,
      message: []
    }
  },
  methods: {
    log (msg) {
      this.message.push({
        msg,
        type: LOG
      })
    },
    error (msg) {
      this.message.push({
        msg,
        type: ERROR
      })
    },
    handleStart () {
      this.log('启动')
      this.progress2()
    },
    promise1 (text, second, success = false) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (success) {
            this.log(text)
            resolve()
          } else {
            reject(text)
          }
        }, second * 1000)
      })
    },
    async progress1 () {
      this.log('进入progress1')
      try {
        await this.promise1('progress1', 2)
      } catch (err) {
        this.error(err)
      }
      // await this.promise1('progress1', 2)
      this.log('结束progress1')
    },
    async progress2 () {
      this.log('进入progress2')
      try {
        await this.progress1()
      } catch (err) {
        this.error(err)
        this.log('能捕获progress1的异常吗？')
      }
      this.log('结束progress2')
    }
  }
}
</script>

<style scoped lang='less'>
.main{
  display: flex;
  height: 100%;
  .left, .right{
    width: 50%;
    height: 100%;
  }
  .result{
    padding: 10px;
    height: 100%;
  }
}
/deep/ .el-dialog{
  background: transparent;
}
</style>
