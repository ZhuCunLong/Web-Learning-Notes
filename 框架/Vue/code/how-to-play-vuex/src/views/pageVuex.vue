<template>
  <div>
    <div>
      <h1>基本用法</h1>
      <div>外部变量a的值：{{outA}}</div>
      <input v-model="a" />
      <button @click="handleEditA">修改outA</button>
      <button @click="handleEditA1">异步修改</button>
      <div>
        外部数据count：{{outCount}}
        <button @click="handleAdd">+</button>
        <button @click="handleReduce">-</button>
      </div>
    </div>
    <div>
      <h1>modules用法</h1>
      <div>user模块name：{{name}}</div>
      <div>goods模块name：{{goodsName}}</div>
      <input v-model="b"/>
      <button @click="handleUpdateName">修改name</button>
      <button @click="handleUpdateName1">异步修改</button>
      <div>
        user模块age：{{age}}
        <button @click="handleAddAge">+</button>
      </div>
    </div>
    <div>
      <h1>getters用法</h1>
      <div>外部getters：{{outInfo}}</div>
      <div>user模块getters：{{userInfo}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageVuex',
  computed: {
    outA () {
      return this.$store.state.outA
    },
    outCount () {
      return this.$store.state.outCount
    },
    name () {
      return this.$store.state.user.name
    },
    age () {
      return this.$store.state.user.age
    },
    goodsName () {
      return this.$store.state.goods.name
    },
    outInfo () {
      return this.$store.getters.outInfo
    },
    userInfo () {
      // return this.$store.getters['user/userInfo'] // 当模块开启namespaced之后这么使用
      // return this.$store.getters.user.userInfo // 这种写法不管如何都会报错
      return this.$store.getters.userInfo // 当模块未开启namespaced时这么使用
    }
  },
  data () {
    return {
      a: '',
      b: ''
    }
  },
  methods: {
    handleEditA () {
      this.$store.commit('EDITA', this.a)
    },
    handleEditA1 () {
      this.$store.dispatch('EDITA', this.a)
    },
    handleAdd () {
      this.$store.commit('OUTADD')
    },
    handleReduce () {
      this.$store.commit('OUTREDUCE')
    },
    handleUpdateName () {
      // this.$store.commit('goods/UPDATENAME', this.b)
      this.$store.commit('UPDATENAME', this.b)
    },
    handleUpdateName1 () {
      // this.$store.dispatch('user/updateName', this.b)
      this.$store.dispatch('updateName', this.b)
    },
    handleAddAge () {
      // this.$store.commit('user/ADDAGE')
      this.$store.commit('ADDAGE')
    }
  }
}
</script>

<style scoped lang="less">
</style>
