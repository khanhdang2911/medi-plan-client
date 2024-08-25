/** @format */

import { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthWrapper({ children }) {
	const [loading, setLoading] = useState(false)
	const [dataAuth, setDataAuth] = useState({
		isAuthenticated: false,
		user: {
			email: '',
			roldId: '',
		},
	})

	const data = {
		dataAuth,
		setDataAuth,
		loading,
		setLoading,
	}
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export default AuthWrapper
