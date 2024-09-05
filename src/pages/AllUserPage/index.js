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
import { Box, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Typography from '@mui/material/Typography'
import AddUserModal from '~/components/AddUserModal'

const AllUserPage = () => {
	const [open, setOpen] = useState(false)
	const [alert, setAlert] = useState({ severity: 'success', text: '' })

	//modal
	const [openModal, setOpenMoal] = useState(false)
	const handleOpenModal = () => setOpenMoal(true)
	const handleCloseModal = (setAllValues, setError) => {
		setOpenMoal(false)
		setAllValues({
			email: '',
			fullname: '',
			phone: '',
			address: '',
			gender: '',
		})
		setError('')
	}

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
				const data = await axios.get('/users/get-all-user')
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
						text: `${error.message}, Unauthorization!!!`,
					},
				})
			}
		}
		fetchGetAllUser()
	}, [navigate])
	return (
		<>
			{allUserData.length > 0 && (
				<Box sx={{ padding: '20px 40px' }}>
					<Typography
						variant='h3'
						sx={{ textAlign: 'center', fontWeight: 'bold', color: '#0984e3', mb: '20px' }}
					>
						MANAGE USER
					</Typography>
					<Button
						variant='contained'
						sx={{ mb: '20px', fontSize: '1.2rem' }}
						startIcon={<PersonAdd />}
						onClick={handleOpenModal}
					>
						Add new user
					</Button>
					<TableContainer
						component={Paper}
						sx={{ border: '1px solid' }}
					>
						<Table
							sx={{ minWidth: 650 }}
							size='small'
							aria-label='a dense table'
						>
							<TableHead sx={{ fontSize: '1rem' }}>
								<TableRow>
									<TableCell>Email</TableCell>
									<TableCell>Fullname</TableCell>
									<TableCell>Phone</TableCell>
									<TableCell>Address</TableCell>
									<TableCell>Action</TableCell>
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
										<TableCell>{row.phonenumber}</TableCell>
										<TableCell>{row.address}</TableCell>
										<TableCell sx={{ display: 'flex' }}>
											<IconButton
												children={<EditIcon />}
												sx={{ color: '#f1c40f' }}
											/>
											<IconButton
												children={<DeleteIcon />}
												sx={{ color: '#e74c3c' }}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
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
			<AddUserModal
				openModal={openModal}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
			/>
		</>
	)
}

export default AllUserPage
