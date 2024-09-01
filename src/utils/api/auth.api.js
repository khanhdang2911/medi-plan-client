/** @format */

import { refreshInstance as axios } from '../httpRequest'

const refreshToken = async () => {
	try {
		const tokenRes = await axios.post(
			'/api/refresh-token',
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
export { refreshToken }
