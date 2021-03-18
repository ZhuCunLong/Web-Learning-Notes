export default {
  methods: {
    handleStart1 () {
      this.log('启动1')
      this.progress1_1()
    },
    async progress1_1 () {
      this.log('进入progress1-1')
      try {
        this.visible = true
        await this.promise1('progress1-1', 2, false)
      } catch (err) {
        this.error(err)
      }
      this.log('结束progress1-1')
    }
  }
}
