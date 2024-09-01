/** @format */

import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'
const Anonymous = () => {
	const { dataAuth } = useContext(AuthContext)
	if (dataAuth.isAuthenticated) {
		return (
			<Navigate
				to='/'
				replace
			/>
		)
	}
	return <Outlet />
}

export default Anonymous
