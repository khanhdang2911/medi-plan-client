/** @format */

import { Navigate, Outlet } from 'react-router-dom'
import { store } from '~/redux/stote'
const AuthenticatedPage = () => {
	if (!store.getState().auth.isAuthenticated) {
		return <Navigate to='/login' />
	}
	return <Outlet />
}

export default AuthenticatedPage
