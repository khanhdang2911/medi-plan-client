/** @format */
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'
function Header() {
	const { dataAuth } = useContext(AuthContext)
	console.log(dataAuth)
	return (
		<div>
			Header
			{dataAuth.isAuthenticated ? <h1>Da dang nhap</h1> : <h1>Chua dang nhap</h1>}
		</div>
	)
}

export default Header
