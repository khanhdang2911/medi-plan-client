/** @format */

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import KeyIcon from '@mui/icons-material/Key'
import { Link, Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import ChangePasword from './ChangePassword'
function Account() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON, height: '500px', mt: 2, display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ width: '25%', height: '300px', boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
					<Box sx={{ bgcolor: (theme) => theme.booking_care.BG_COLOR, padding: '12px' }}>
						<Typography sx={{ fontWeight: '600', fontSize: '1.3rem', opacity: 0.9 }}>Thông tin tài khoản</Typography>
					</Box>
					<Link to='/account'>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '12px 8px',
								gap: 1,
								color: 'black',
								'&:hover': {
									backgroundColor: 'rgb(237 255 250/ 1)',
									borderRadius: '8px',
								},
							}}
						>
							<PersonIcon />
							<Typography>Thông tin cá nhân</Typography>
						</Box>
					</Link>
					<Link>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '12px 8px',
								gap: 1,
								color: 'black',
								'&:hover': {
									backgroundColor: 'rgb(237 255 250/ 1)',
									borderRadius: '8px',
								},
							}}
						>
							<CalendarMonthIcon />
							<Typography>Lịch khám đã đặt</Typography>
						</Box>
					</Link>
					<Link to='/account/change-password'>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '12px 8px',
								gap: 1,
								color: 'black',
								'&:hover': {
									backgroundColor: 'rgb(237 255 250/ 1)',
									borderRadius: '8px',
								},
							}}
						>
							<KeyIcon />
							<Typography>Đổi mật khẩu</Typography>
						</Box>
					</Link>
				</Box>
				{/* Infomation */}
				<Box sx={{ width: '70%' }}>
					{/* Routes to profile, change-password */}
					<Routes>
						<Route
							index
							element={<Profile />}
						/>
						<Route
							path='change-password'
							element={<ChangePasword />}
						/>
					</Routes>
				</Box>
			</Box>
		</Box>
	)
}

export default Account
