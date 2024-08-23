import Login from "~/pages/Auth/Login";
import Home from "~/pages/Home";
import InHome from "~/pages/InHome";
import InHospital from "~/pages/InHospital";
import LiveHealthy from "~/pages/LiveHealthy";
import routes from "~/config/routes";
import DefaultLayout from "~/layouts/DefaultLayout";
import Register from "~/pages/Auth/Register";

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
		path: routes.login,
		component: Login,
		layout: null,
	},
	{
		path: routes.register,
		component: Register,
		layout:null
	}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}