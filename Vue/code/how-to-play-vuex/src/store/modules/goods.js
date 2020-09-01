const state = {
  name: '华为p40',
  price: 4000
}

const mutations = {
  UPDATENAME: (state, payload) => {
    state.name = payload + ' 这是goods模块'
  }
}

const actions = {
  updateName ({ commit }, payload) {
    setTimeout(() => {
      commit('UPDATENAME', payload)
    }, 1000)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}
