import Vuex from 'vuex'
import Vue from 'vue'

import createLogger from 'vuex/dist/logger'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  users: {
    items: [],
    pending: false,
    error: null,
  },
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()],
  state,
  mutations,
  actions,
})

export default store

