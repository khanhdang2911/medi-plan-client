import Login from '~/pages/Auth/Login/Login'
import Home from '~/pages/Home/Home'
import InHome from '~/pages/InHome/InHome'
import InHospital from '~/pages/InHospital/InHospital'
import LiveHealthy from '~/pages/LiveHealthy/LiveHealthy'
import routes from '~/config/routes'
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout'
import Register from '~/pages/Auth/Register/Register'
import NotFound from '~/pages/NotFound/NotFound'
import Account from '~/pages/Account/Account'
import Admin from '~/pages/Admin/Admin'
import DoctorDetail from '~/pages/DoctorDetail/DoctorDetail'

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
  {
    path: routes.doctorDetail,
    component: DoctorDetail,
    layout: DefaultLayout,
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
    path: routes.admin,
    component: Admin,
    layout: null,
  },
]
export { publicRoutes, privateRoutes, authRoutes }
