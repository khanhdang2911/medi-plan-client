/** @format */

import { refreshInstance as axiosRefresh } from '../httpRequest'
import axios from '../httpRequest'
const refreshToken = async () => {
	try {
		const tokenRes = await axiosRefresh.post(
			'/users/refresh-token',
			{
				refreshToken: localStorage.getItem('refreshToken'),
			},
			{
				headers: {
					Authorization: localStorage.getItem('access_token'),
					'Content-Type': 'application/json',
				},
			}
		)
		const tokenData = tokenRes.data
		return tokenData.access_token
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

const getAccountInfo = async () => {
	const authData = await axios.get('/users/account')
	return authData
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
export { refreshToken, registerUser, loginUser, getAccountInfo, getAllUser, deleteUser, getUserById, updateUser }
