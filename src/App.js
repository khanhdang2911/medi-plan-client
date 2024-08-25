/** @format */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment, useContext, useEffect } from 'react'

import { publicRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import axios from '~/utils/httpRequest'
import { AuthContext } from './context/AuthContext'

function App() {
	const { setDataAuth, setLoading } = useContext(AuthContext)
	useEffect(() => {
		const getAccount = async () => {
			try {
				setLoading(true)
				const userData = await axios.get('/api/account')
				setDataAuth({ isAuthenticated: true, user: userData })
				setLoading(false)
			} catch (error) {
				return error
			}
		}
		getAccount()
	}, [])
	return (
		<Router>
			<Routes>
				{publicRoutes.map((route, index) => {
					let Layout = DefaultLayout
					const Page = route.component
					if (route.layout) Layout = route.layout
					else if (route.layout === null) {
						Layout = Fragment
					}
					return (
						<Route
							key={index}
							element={
								<Layout>
									<Page />
								</Layout>
							}
							path={route.path}
						></Route>
					)
				})}
			</Routes>
		</Router>
	)
}

export default App
