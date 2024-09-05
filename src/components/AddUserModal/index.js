/** @format */

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px',
	display: 'flex',
	flexDirection: 'column',
	gap: '15px',
}

export default function AddUserModal({ openModal, handleCloseModal }) {
	const [error, setError] = useState('')
	const [allValues, setAllValues] = useState({
		email: '',
		fullname: '',
		phone: '',
		address: '',
		gender: '',
	})

	const handleValidate = () => {
		const allValueArray = Object.entries(allValues)
		for (let i = 0; i < allValueArray.length; i++) {
			if (!allValueArray[i][1]) {
				setError(`Please enter your ${allValueArray[i][0]}`)
				return false
			}
		}
		return true
	}
	const handleCreateUser = () => {
		const check = handleValidate()
		if (!check) return
		//Call api
	}
	const handleOnChangeValues = (e) => {
		const name = e.target.name
		const value = e.target.value
		setAllValues((prev) => ({ ...prev, [name]: value }))
	}
	return (
		<div>
			<Modal
				open={openModal}
				onClose={() => {
					handleCloseModal(setAllValues, setError)
				}}
				aria-labelledby='modal-modal-title-add-user'
				aria-describedby='modal-modal-description-add-user'
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={openModal}>
					<Box sx={style}>
						<Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>CREATE NEW USER</Typography>
						<Typography sx={{ color: 'red' }}>{error}</Typography>
						<TextField
							id='outlined-basic-email'
							label='Email'
							name='email'
							variant='outlined'
							size='small'
							sx={{ width: '100%' }}
							onChange={(e) => handleOnChangeValues(e)}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<TextField
								id='outlined-basic-fullname'
								label='Fullname'
								name='fullname'
								variant='outlined'
								size='small'
								sx={{ width: '50%' }}
								onChange={(e) => handleOnChangeValues(e)}
							/>
							<TextField
								id='outlined-basic-phone'
								label='Phone'
								name='phone'
								variant='outlined'
								size='small'
								onChange={(e) => handleOnChangeValues(e)}
							/>
						</Box>
						<TextField
							id='outlined-basic-address'
							label='Address'
							name='address'
							variant='outlined'
							size='small'
							onChange={(e) => handleOnChangeValues(e)}
							sx={{ width: '100%' }}
						/>
						<Box>
							<FormControl
								sx={{ minWidth: 100 }}
								size='small'
							>
								<InputLabel id='gender-simple-select-label'>Gender</InputLabel>
								<Select
									labelId='gender-simple-select-label'
									id='gender-simple-select'
									name='gender'
									value={allValues.gender}
									label='Gender'
									onChange={(e) => handleOnChangeValues(e)}
								>
									<MenuItem value='1'>Male</MenuItem>
									<MenuItem value='0'>Female</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
							<Button
								variant='contained'
								onClick={handleCreateUser}
								sx={{ fontWeight: '500' }}
							>
								Create
							</Button>
							<Button
								variant='contained'
								onClick={() => {
									handleCloseModal(setAllValues, setError)
								}}
								sx={{ bgcolor: '#ff7675', '&:hover': { bgcolor: '#ff7675' }, fontWeight: '500' }}
							>
								Cancel
							</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
