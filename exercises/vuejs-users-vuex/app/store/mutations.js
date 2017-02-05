export default {

  addUser_request: (state) => {
    state.users.pending = true
    state.users.error = null
  },

  addUser_success: (state, payload) => {
    state.users.pending = false
    const userIndex = state.users.items.findIndex(item => item.id === payload.user.id)
    if (userIndex !== -1) {
      // existing user, update
      // you may not update the item in the array
      // instead we replace the item
      state.users.items.splice(userIndex, 1, payload.user)
    } else {
      state.users.items.push(payload.user)
    }
  },

  addUser_error: (state, payload) => {
    state.users.pending = false
    state.users.error = payload.error
  },

  getUsers_request: (state) => {
    state.users.pending = true
    state.users.error = null
  },

  getUsers_success: (state, payload) => {
    state.users.pending = false
    state.users.items = payload.users
  },

  getUsers_error: (state, payload) => {
    state.users.pending = false
    state.users.error = payload.error
  },

  deleteUser_request: (state) => {
    state.users.pending = true
    state.users.error = null
  },

  deleteUser_success: (state, payload) => {
    state.users.pending = false
    state.users.items = state.users.items.filter(item => item.id !== payload.user.id)
  },

  deleteUser_error: (state, payload) => {
    state.users.pending = false
    state.users.error = payload.error
  },

}
