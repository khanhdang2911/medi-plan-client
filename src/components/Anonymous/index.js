import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '~/redux/selectors'
//if user is authenticated, redirect to home page
const Anonymous = () => {
  const auth = useSelector(getAuthSelector)
  if (auth.isAuthenticated) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default Anonymous
