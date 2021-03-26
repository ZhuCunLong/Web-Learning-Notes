import Vue from 'vue'
import Vuex from 'vuex'

/* import user from './modules/user'
import goods from './modules/goods' */

import getters from '@/store/getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  outA: '外部state中的变量a',
  outCount: 0
}

const mutations = { // 命名方式推荐大写
  EDITA (state, payload) {
    // state.outA = payload
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(payload)
    //   }, 1000)
    // }).then(res => {
    //   state.outA = res
    // })
    setTimeout(() => {
      state.outA = payload
    }, 1000)
  },
  OUTADD (state) {
    state.outCount += 1
  },
  OUTREDUCE (state) {
    state.outCount -= 1
  }
}

const actions = { // 严格区分大小写
  // 与mutations中的属性重名也不会影响运行
  EDITA (store, payload) {
    setTimeout(() => {
      store.commit('EDITA', payload)
    }, 1000)
  },
  // action中同样可以修改state中的数据，但是也不推荐这么干
  editA ({ commit, state }, payload) {
    setTimeout(() => {
      // commit('EDITA', payload)
      state.outA = payload
    }, 1000)
  }
}

/* const modules = {
  user,
  goods
} */

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
})
