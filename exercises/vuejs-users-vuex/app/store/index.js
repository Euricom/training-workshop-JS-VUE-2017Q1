import Vuex from 'vuex'
import Vue from 'vue'

import createLogger from 'vuex/dist/logger'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const defaultState = {
  users: {
    items: [],
    pending: false,
    error: null,
  },
}

const getters = {
  getUser(state) {
    const userId = state.route.params.id
    return state.users.items.find(item => item.id === userId)
  },
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()],
  state: defaultState,
  mutations,
  actions,
  getters,
})

export default store

