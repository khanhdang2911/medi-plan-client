/** @format */

import { useState } from 'react'
import { Avatar, Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import WcIcon from '@mui/icons-material/Wc'
function Profile() {
	const [age, setAge] = useState('')

	const handleChange = (event) => {
		setAge(event.target.value)
	}
	return (
		<Box sx={{ padding: '20px', boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}>
			<Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', opacity: 0.9 }}>Thông tin cá nhân</Typography>
			<Box sx={{ mt: '20px', display: 'flex', gap: 2 }}>
				<Box>
					<Avatar
						sx={{ width: '150px', height: '150px' }}
						alt='Remy Sharp'
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VdyLAqNM556TQxDHAzDUDuYgtTfgWubcGg&s'
					/>
					<Button
						variant='contained'
						sx={{ mt: 2 }}
					>
						Thay ảnh đại diện
					</Button>
				</Box>
				<Box>
					<Box sx={{ display: 'flex', gap: '30px', padding: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '100px', gap: 1 }}>
							<PersonIcon sx={{ fontSize: '18px' }} />
							<Typography>Fullname</Typography>
						</Box>
						<TextField
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
								value={age}
								onChange={handleChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button
							variant='contained'
							sx={{ fontWeight: '600' }}
						>
							Cập nhật
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Profile
