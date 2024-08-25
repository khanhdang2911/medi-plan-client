/** @format */

import { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from '~/utils/httpRequest'
import { useNavigate } from 'react-router-dom'

const AllUserPage = () => {
	const [open, setOpen] = useState(false)
	const [alert, setAlert] = useState({ severity: 'success', text: '' })
	const navigate = useNavigate()
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const [allUserData, setAllUserData] = useState([])
	useEffect(() => {
		const fetchGetAllUser = async () => {
			try {
				const data = await axios.get('/api/get-all-user')
				setAllUserData(data.data.allUser)
				setAlert({
					severity: 'success',
					text: 'Get all user successfully!',
				})
				setOpen(true)
			} catch (error) {
				navigate('/', {
					replace: true,
					state: {
						severity: 'error',
						text: `${error.message}`,
					},
				})
			}
		}
		fetchGetAllUser()
	}, [navigate])
	return (
		<>
			{allUserData.length > 0 && (
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						size='small'
						aria-label='a dense table'
					>
						<TableHead>
							<TableRow>
								<TableCell>Email</TableCell>
								<TableCell>Fullname</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Address</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allUserData.map((row, index) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell
										component='th'
										scope='row'
									>
										{row.email}
									</TableCell>
									<TableCell>{row.fullname}</TableCell>
									<TableCell>{row.phone}</TableCell>
									<TableCell>{row.gender}</TableCell>
									<TableCell>{row.address}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
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
		</>
	)
}

export default AllUserPage
