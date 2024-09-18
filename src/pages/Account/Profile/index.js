/** @format */

import { useState, useEffect } from 'react'
import { Alert, Avatar, Button, Snackbar, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import WcIcon from '@mui/icons-material/Wc'
import { getAccount, updateUser } from '~/utils/api/auth.api'
import { useNavigate } from 'react-router-dom'
import { store } from '~/redux/stote'
import authSlice from '~/redux/authSlice'
function Profile() {
	const user = store.getState().auth.user
	const navigate = useNavigate()
	const [imageFile, setImageFile] = useState(null)
	const [imageURL, setImageURL] = useState('')
	const [error, setError] = useState('')
	const [alert, setAlert] = useState({ severity: 'success', text: '' })
	const [openAlert, setOpenAlert] = useState(false)
	const [allValues, setAllValues] = useState({
		id: '',
		fullname: '',
		email: '',
		address: '',
		phonenumber: '',
		gender: '0',
		image: '',
	})
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenAlert(false)
	}
	//delete image when change to another image
	useEffect(() => {
		return () => {
			if (imageURL) {
				URL.revokeObjectURL(imageURL)
			}
		}
	}, [imageURL])
	useEffect(() => {
		//get account by refresh token
		const getAccountInfo = async () => {
			try {
				const response = await getAccount()
				const data = response.data
				if (data.success === true) {
					setAllValues({
						id: data.user.id,
						fullname: data.user.fullname,
						email: data.user.email,
						address: data.user.address,
						phonenumber: data.user.phonenumber,
						gender: data.user.gender ? '1' : '0',
						image: data.user.image,
					})
				} else {
					navigate('/')
				}
			} catch (error) {
				navigate('/')
			}
		}
		getAccountInfo()
	}, [navigate])
	const handleChangeInfo = (e) => {
		const { name, value } = e.target
		setAllValues({ ...allValues, [name]: value })
	}
	const handleChangeAvatar = async (e) => {
		const imageFile = e.target.files[0]
		if (imageFile.type.split('/')[0] !== 'image') {
			setError('File không đúng định dạng ảnh')
			return
		}
		if (imageFile) {
			const newImageURL = URL.createObjectURL(imageFile)
			setImageURL(newImageURL)
			setImageFile(imageFile)
		}
	}
	const handleUpdateInfo = async () => {
		if (!allValues.fullname) {
			setError('Bạn chưa nhập họ tên')
		} else if (!allValues.address) {
			setError('Bạn chưa nhập địa chỉ')
		} else if (!allValues.phonenumber) {
			setError('Bạn chưa nhập số điện thoại')
		} else {
			setError('')
		}
		//if phone number is not number, is not 10 digits
		for (let i = 0; i < allValues.phonenumber.length; i++) {
			if (isNaN(allValues.phonenumber[i])) {
				setError('Phone number must be number')
				break
			}
		}
		if (allValues.phonenumber.length !== 10) {
			setError('Phone number must be 10 digits')
		}
		//update info
		try {
			const formData = new FormData()
			formData.append('id', allValues.id)
			formData.append('fullname', allValues.fullname)
			formData.append('email', allValues.email)
			formData.append('address', allValues.address)
			formData.append('phonenumber', allValues.phonenumber)
			formData.append('gender', allValues.gender)
			formData.append('image', imageFile)
			const response = await updateUser(formData)
			const data = response.data
			if (data.success === true) {
				setAllValues({
					id: data.user.id,
					fullname: data.user?.fullname,
					email: data.user?.email,
					address: data.user?.address,
					phonenumber: data.user?.phonenumber,
					gender: data.user?.gender ? '1' : '0',
					image: data.user?.image,
				})
				setAlert({ severity: 'success', text: 'Cập nhật thông tin thành công' })
				setOpenAlert(true)
				store.dispatch(authSlice.actions.updateUser(data.user))
			}
		} catch (error) {
			setAlert({ severity: 'error', text: 'Cập nhật thông tin thất bại' })
			setOpenAlert(true)
		}
	}
	return (
		<>
			<Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', opacity: 0.9 }}>Thông tin cá nhân</Typography>
			<Box sx={{ mt: '20px', display: 'flex', gap: 2 }}>
				<Box>
					<Avatar
						sx={{ width: '150px', height: '150px' }}
						alt='Remy Sharp'
						src={imageURL || allValues.image || user.fullname[0]}
					/>
					<Button
						variant='contained'
						component='label'
						sx={{ mt: 2 }}
					>
						Thay ảnh đại diện
						<input
							onChange={handleChangeAvatar}
							type='file'
							hidden
						/>
					</Button>
				</Box>
				<Box>
					<Typography sx={{ padding: '8px 16px', color: 'red' }}>{error}</Typography>
					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<PersonIcon sx={{ fontSize: '18px' }} />
							<Typography>Fullname</Typography>
						</Box>
						<TextField
							name='fullname'
							value={allValues.fullname}
							onChange={(e) => handleChangeInfo(e)}
							size='small'
							sx={{ width: '400px' }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<EmailIcon sx={{ fontSize: '18px' }} />
							<Typography>Email</Typography>
						</Box>
						<TextField
							name='email'
							value={allValues.email}
							disabled
							size='small'
							sx={{ width: '400px' }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<HomeIcon sx={{ fontSize: '18px' }} />
							<Typography>Địa chỉ</Typography>
						</Box>
						<TextField
							name='address'
							value={allValues.address}
							onChange={(e) => handleChangeInfo(e)}
							size='small'
							sx={{ width: '400px' }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<PhoneEnabledIcon sx={{ fontSize: '18px' }} />
							<Typography>Điện thoại</Typography>
						</Box>
						<TextField
							name='phonenumber'
							value={allValues.phonenumber}
							onChange={(e) => handleChangeInfo(e)}
							size='small'
							sx={{ width: '400px' }}
						/>
					</Box>
					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<WcIcon sx={{ fontSize: '18px' }} />
							<Typography>Giới tính</Typography>
						</Box>
						<FormControl
							size='small'
							sx={{ minWidth: 120 }}
						>
							<Select
								name='gender'
								value={allValues.gender}
								onChange={(e) => handleChangeInfo(e)}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem value='1'>Male</MenuItem>
								<MenuItem value='0'>Female</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button
							onClick={() => handleUpdateInfo()}
							variant='contained'
							sx={{ fontWeight: '600' }}
						>
							Cập nhật
						</Button>
					</Box>
				</Box>
			</Box>
			<Snackbar
				open={openAlert}
				autoHideDuration={1000}
				onClose={handleCloseAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseAlert}
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

export default Profile
