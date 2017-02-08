import { getUsers, saveUser, deleteUser } from '../services/userApi'

export default {
  addUser({ commit }, payload) {
    commit('addUser_request')
    return saveUser(payload.user)
      .then((user) => {
        commit('addUser_success', { user })
      })
      .catch((error) => {
        commit('addUser_error', { error })
      })
  },
  getUsers({ commit, state }) {
    if (state.users.items.length > 0) {
      return Promise.resolve(state.users.items)
    }
    commit('getUsers_request')
    return getUsers()
      .then((users) => {
        commit('getUsers_success', { users })
        return users
      })
      .catch((error) => {
        commit('getUsers_error', { error })
      })
  },

  deleteUser({ commit }, payload) {
    const user = payload.user
    commit('deleteUser_request')
    return deleteUser(user)
      .then(() => {
        commit('deleteUser_success', { user })
      })
      .catch((error) => {
        commit('deleteUsers_error', { error })
      })
  },
}
