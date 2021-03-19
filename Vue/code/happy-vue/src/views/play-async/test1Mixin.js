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
    },
    async handleStart2 () {
      this.log('启动2')
      await this.progress2_1()
      this.log('结束2')
    },
    async progress2_1 (flag = false) {
      this.log('进入progress2-1')
      if (flag) {
        try {
          await this.promise1('progress2-1', 2)
        } catch (err) {
          this.error(err)
        }
      } else {
        await this.promise1('progress2-1', 2)
      }
      this.log('结束progress2-1')
    },
    handleStart3 () {
      this.log('启动3')
      this.progress2_1(true)
      this.log('结束3')
    }
  }
}
