/** @format */
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshToken } from './api/auth.api'
// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

const refreshInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

// Add a request interceptor
instance.interceptors.request.use(
	async function (config) {
		let access_token = localStorage.getItem('access_token')
		config.headers['Authorization'] = 'Bearer ' + access_token
		if (access_token === 'null') {
			access_token = null
		}
		if (access_token) {
			try {
				const decodedToken = jwtDecode(access_token)
				const currentTime = Date.now() / 1000
				if (decodedToken.exp - currentTime < 200) {
					const dataToken = await refreshToken()
					if (dataToken) {
						localStorage.setItem('access_token', dataToken)
						config.headers['Authorization'] = 'Bearer ' + dataToken
					}
				}
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return config
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
