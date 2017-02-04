import axios from 'axios'

export const getUsers = () => {
  return axios.get('api/users')
    .then((res) => {
      return res.data.users
    })
}

export const getUser = (userId) => {
  return axios.get(`api/users/${userId}`)
    .then((res) => {
      return res.data
    })
}

export const deleteUser = (user) => {
  return axios.delete(`api/users/${user.id}`)
    .then((res) => {
      return res.data
    })
}

export const saveUser = (user) => {
  if (user.id) {
    return axios.put(`api/users/${user.id}`, user)
      .then((res) => {
        return res.data
      })
  }
  return axios.post('api/users', user)
    .then((res) => {
      return res.data
    })
}

export default {
  getUsers,
  getUser,
  deleteUser,
  saveUser,
}
