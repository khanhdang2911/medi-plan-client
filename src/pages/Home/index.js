/** @format */

import { Box } from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BannerHome from './Banner'
import RemoteMedical from './RemoteMedical'
function Home() {
	//
	const [alert, setAlert] = useState({ severity: 'success', text: '' })
	const [open, setOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	useEffect(() => {
		if (location.state) {
			setAlert(location.state)
			setOpen(true)
			navigate('/', { replace: true })
		}
	}, [location.state, navigate])
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}
	return (
		<Box>
			{/* Noi khoi nguon suc khoe */}
			<BannerHome />
			{/* Kham tu xa */}
			<RemoteMedical />
			{/* Alert */}
			<Snackbar
				open={open}
				autoHideDuration={1000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleClose}
					severity={alert.severity}
					variant='filled'
					sx={{ width: '100%' }}
				>
					{alert.text}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default Home
