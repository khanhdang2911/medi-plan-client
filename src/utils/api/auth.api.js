import { refreshInstance as axiosRefresh } from '../httpRequest'
import axios from '../httpRequest'
import { store } from '~/redux/store'
const refreshToken = async () => {
  try {
    const tokenRes = await axiosRefresh.post(
      '/users/refresh-token',
      {},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + store.getState().auth.user?.accessToken,
        },
      },
    )
    const tokenData = tokenRes.data
    return tokenData.accessToken
  } catch (error) {
    return null
  }
}
const registerUser = async (data) => {
  const response = await axiosRefresh.post('/users/register', data)
  return response
}

const loginUser = async (data) => {
  const response = await axiosRefresh.post('/users/login', data)
  return response
}
const logOutUser = async () => {
  const response = await axios.get('/users/logout')
  return response
}
const getAllUser = async () => {
  const data = await axios.get('/users/get-all-user')
  return data
}

const deleteUser = async (id) => {
  const data = await axios.delete(`/users/delete-user/${id}`)
  return data
}

const getUserById = async (id) => {
  const data = await axios.get('/users/get-user-by-id', {
    params: {
      id: id,
    },
  })
  return data
}
//get account by refresh token
const getAccount = async () => {
  const data = await axios.get('/users/get-account')
  return data
}

const updateUser = async (data) => {
  const response = await axios.put('/users/update-user', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}
const updateUserForAdmin = async (data) => {
  const response = await axios.put('/users/update-user-for-admin', data)
  return response
}

const changePassword = async (data) => {
  const response = await axios.put('/users/change-password', data)
  return response
}

const getAllPosition = async () => {
  const response = await axios.get('/users/get-type-allcode', {
    params: {
      type: 'POSITION',
    },
  })
  return response
}
const getAllRole = async () => {
  const response = await axios.get('/users/get-type-allcode', {
    params: {
      type: 'ROLE',
    },
  })
  return response
}
export {
  refreshToken,
  registerUser,
  loginUser,
  logOutUser,
  getAllUser,
  deleteUser,
  getAccount,
  getUserById,
  updateUser,
  updateUserForAdmin,
  changePassword,
  getAllPosition,
  getAllRole,
}
