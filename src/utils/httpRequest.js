/** @format */
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshToken } from './api/auth.api'
import authSlice from '~/redux/authSlice'
import { store } from '~/redux/store'
// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL,
	withCredentials: true,
})

const refreshInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL,
	withCredentials: true,
})

const handleRefreshToken = async (config) => {
	const auth = store.getState().auth
	let accessToken = auth.user?.accessToken
	config.headers['Authorization'] = 'Bearer ' + accessToken
	if (accessToken) {
		try {
			const decodedToken = jwtDecode(accessToken)
			const currentTime = Date.now() / 1000
			if (currentTime - decodedToken.exp > 200) {
				const dataToken = await refreshToken()
				if (dataToken) {
					store.dispatch(authSlice.actions.setAccessTokenFromRefreshToken(dataToken))
					config.headers['Authorization'] = 'Bearer ' + dataToken
				}
				//log out if refresh token is not found/not valid
				else {
					store.dispatch(authSlice.actions.logout())
					await instance.get('/users/logout')
				}
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}
	return config
}
// Add a request interceptor
instance.interceptors.request.use(
	async function (config) {
		return await handleRefreshToken(config)
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error?.response?.data) {
			return Promise.reject(error.response.data)
		}
		return Promise.reject(error)
	}
)

export default instance
export { refreshInstance }
