import Home from "~/components/Home";
import InHome from "~/components/InHome";
import InHospital from "~/components/InHospital";
import LiveHealthy from "~/components/LiveHealthy";
import routes from "~/config/routes";
import DefaultLayout from "~/layouts/DefaultLayout";

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
]

const privateRoutes = []

export {publicRoutes, privateRoutes}