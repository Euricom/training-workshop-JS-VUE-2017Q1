import axios from 'axios'
import eventBus from '../core/eventBus'
import events from '../events'
import { NoNetworkError, ApiError, NotFoundError } from '../core/errors'

const handleHttpError = (rawError) => {
  console.warn('Http request failed', rawError)

  // cast error to something more usefull
  let errorToThrow
  switch (rawError.response.status) {
    case 504:
    case 0:
      errorToThrow = new NoNetworkError()
      break
    case 404:
      errorToThrow = new NotFoundError()
      break
    default:
      errorToThrow = new ApiError(rawError.response.status,
                                  rawError.response.statusText,
                                  rawError.response.data)
      break
  }

  // notify error
  eventBus.fire(events.requestFailed, errorToThrow)

  // throw new error
  throw errorToThrow
}

export const getUsers = () => {
  return axios.get('api/users')
    .then((res) => {
      return res.data.users
    })
    .catch(handleHttpError)
}

export const getUser = (userId) => {
  return axios.get(`api/users/${userId}`)
    .then((res) => {
      return res.data
    })
    .catch(handleHttpError)
}

export const deleteUser = (user) => {
  return axios.delete(`api/users/${user.id}`)
    .then((res) => {
      return res.data
    })
    .catch(handleHttpError)
}

export const updateUser = (user) => {
  return axios.put(`api/users/${user.id}`, user)
    .then((res) => {
      return res.data
    })
    .catch(handleHttpError)
}

export const addUser = (user) => {
  return axios.post('api/users', user)
    .then((res) => {
      return res.data
    })
    .catch(handleHttpError)
}

export const saveUser = (user) => {
  if (user.id) {
    return updateUser(user)
  }
  return addUser(user)
}

export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  saveUser,
}
