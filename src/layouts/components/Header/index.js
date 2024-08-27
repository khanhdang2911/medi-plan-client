/** @format */
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'
import images from '~/assets'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login'
function Header() {
	const { dataAuth } = useContext(AuthContext)
	const menuItems = [
		{ to: '/', label: 'Tất cả', style: { backgroundColor: 'rgb(255, 196, 25)', color: 'rgb(255, 243, 209)', fontWeight: 'bold' } },
		{ to: '/in-home', label: 'Tại nhà' },
		{ to: '/in-hospital', label: 'Tại viện' },
		{ to: '/live-healthy', label: 'Sống khỏe' },
	]
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '15px',
				height: (theme) => theme.booking_care.HEADER_HEIGHT,
				bgcolor: 'rgb(237 255 250/ 1)',
			}}
		>
			<Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON, height: '100%', display: 'flex', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<Button sx={{ width: '35px', height: '35px', minWidth: 0 }}>
						<img
							width='35px'
							height='35px'
							src={images.navbar}
							alt='navbar'
							loading='lazy'
						/>
					</Button>
					<Link to='/'>
						<img
							width='200px'
							height='43px'
							src={images.logo}
							alt='logo'
							loading='lazy'
						/>
					</Link>
				</Box>
				<Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%', ml: '30px' }}>
					{menuItems.map((item) => {
						return (
							<Link
								to={item.to}
								style={{ display: 'flex', padding: '4px 6px', borderRadius: '20px', backgroundColor: item?.style?.backgroundColor || 'transparent' }}
							>
								<Typography sx={{ color: item?.style?.color || 'rgb(17, 17, 17)', fontWeight: item?.style?.fontWeight || 'normal', fontSize: '1.2rem' }}>
									{item.label}
								</Typography>
							</Link>
						)
					})}
					<TextField
						id='outlined-basic-search'
						label='Search'
						variant='outlined'
						size='small'
						sx={{
							'.MuiInputBase-root': {
								borderRadius: '20px',
							},
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', ml: '50px' }}>
					<Link>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<img
								src={images.appointment}
								alt='lich hen'
								width='26'
								height='26'
								loading='lazy'
							/>
							<Typography sx={{ color: 'rgb(69, 195, 210)', fontSize: '14px', fontWeight: 'bold' }}>Lịch hẹn</Typography>
						</Box>
					</Link>
					<Button
						variant='outlined'
						startIcon={<LoginIcon />}
					>
						Login
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default Header
