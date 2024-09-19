/** @format */

import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '~/redux/selectors'
const AuthenticatedPage = () => {
	const auth = useSelector(getAuthSelector)
	if (!auth.isAuthenticated) {
		return <Navigate to='/login' />
	}
	return <Outlet />
}

export default AuthenticatedPage
