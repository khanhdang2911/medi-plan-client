/** @format */

import authSlice from '~/redux/authSlice'
import { refreshInstance as axiosRefresh } from '../httpRequest'
import axios from '../httpRequest'
import { store } from '~/redux/stote'
const refreshToken = async () => {
	//if cookies is not have refresh token, return null
	if (document.cookie.indexOf('refreshToken') === -1) {
		//dispatch logout
		store.dispatch(authSlice.actions.logout())
		return null
	}
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
			}
		)
		const tokenData = tokenRes.data
		return tokenData.accessToken
	} catch (error) {
		return null
	}
}
const registerUser = async (data) => {
	const response = await axios.post('/users/register', data)
	return response
}

const loginUser = async (data) => {
	const response = await axios.post('/users/login', data)
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

const updateUser = async (data) => {
	const response = await axios.put('/users/update-user', data)
	return response
}
export { refreshToken, registerUser, loginUser, logOutUser, getAllUser, deleteUser, getUserById, updateUser }
