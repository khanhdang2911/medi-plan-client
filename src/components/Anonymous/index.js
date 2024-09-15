/** @format */

import { Navigate, Outlet } from 'react-router-dom'
import { store } from '~/redux/stote'
const Anonymous = () => {
	if (store.getState().auth.isAuthenticated) {
		return <Navigate to="/" />
	}
	return <Outlet />
}

export default Anonymous
