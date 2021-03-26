const state = {
  name: 'zcl',
  age: 25
}

const mutations = {
  UPDATENAME: (state, payload) => {
    state.name = payload + ' 这是user模块'
  },
  ADDAGE: state => {
    state.age += 1
  }
}

const actions = {
  updateName ({ commit }, payload) {
    setTimeout(() => {
      commit('UPDATENAME', payload)
    }, 1000)
  }
}

const getters = {
  userInfo: (state) => {
    return `我是${state.name}，今年${state.age}岁`
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters
}
