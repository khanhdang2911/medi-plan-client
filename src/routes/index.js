/** @format */

import Login from '~/pages/Auth/Login'
import Home from '~/pages/Home'
import InHome from '~/pages/InHome'
import InHospital from '~/pages/InHospital'
import LiveHealthy from '~/pages/LiveHealthy'
import routes from '~/config/routes'
import DefaultLayout from '~/layouts/DefaultLayout'
import Register from '~/pages/Auth/Register'
import AllUsePage from '~/pages/AllUserPage'
import NotFound from '~/pages/NotFound'
import Account from '~/pages/Account'

const publicRoutes = [
	{
		path: routes.home,
		component: Home,
		layout: DefaultLayout,
	},
	{
		path: routes.inHome,
		component: InHome,
		layout: DefaultLayout,
	},
	{
		path: routes.inHospital,
		component: InHospital,
		layout: DefaultLayout,
	},
	{
		path: routes.liveHealthy,
		component: LiveHealthy,
		layout: DefaultLayout,
	},

	{
		path: routes.notFound,
		component: NotFound,
		layout: null,
	},
]

const privateRoutes = [
	{
		path: routes.login,
		component: Login,
		layout: null,
	},
	{
		path: routes.register,
		component: Register,
		layout: null,
	},
]

const authRoutes = [
	{
		path: routes.account,
		component: Account,
		layout: DefaultLayout,
	},

	{
		path: routes.allUserPage,
		component: AllUsePage,
		layout: null,
	},
]
export { publicRoutes, privateRoutes, authRoutes }
