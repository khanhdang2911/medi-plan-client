/** @format */
import Box from '@mui/material/Box'
import { Fragment, useState } from 'react'
import images from '~/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { store } from '~/redux/stote'
import { logOutUser } from '~/utils/api/auth.api'
import authSlice from '~/redux/authSlice'
function Header() {
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(store.getState().auth.isAuthenticated)
	const user = store.getState().auth.user
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleLogout = async () => {
		try {
			store.dispatch(authSlice.actions.logout())
			setIsAuthenticated(false)
			await logOutUser()
			navigate('/')
		} catch (error) {}
	}
	const menuItems = [
		{ to: '/', label: 'Tất cả' },
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
				<Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%', ml: '10px', pl: 1, pr: 1 }}>
					{menuItems.map((item, index) => {
						return (
							<NavLink
								key={index}
								to={item.to}
								style={({ isActive }) => ({
									display: 'flex',
									padding: '4px 6px',
									borderRadius: '20px',
									backgroundColor: isActive ? 'rgb(255, 196, 25)' : 'transparent',
								})}
							>
								{({ isActive }) => (
									<Typography
										sx={{
											color: isActive ? 'rgb(255, 243, 209)' : 'rgb(17, 17, 17)',
											fontWeight: isActive ? 'bold' : 'normal',
											fontSize: '1.2rem',
										}}
									>
										{item.label}
									</Typography>
								)}
							</NavLink>
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
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', ml: '20px' }}>
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
					<Link>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<img
								src={images.help}
								alt='lich hen'
								width='26'
								height='26'
								loading='lazy'
							/>
							<Typography sx={{ color: 'rgb(69, 195, 210)', fontSize: '14px', fontWeight: 'bold' }}>Hỗ trợ</Typography>
						</Box>
					</Link>
					{!isAuthenticated ? (
						<Link to='/login'>
							<Button
								variant='outlined'
								startIcon={<LoginIcon />}
								sx={{
									borderColor: 'rgb(69, 195, 210)',
									'&:hover': {
										borderColor: 'rgb(69, 195, 210)',
									},
									color: 'rgb(69, 195, 210)',
									fontWeight: '500',
								}}
							>
								Login
							</Button>
						</Link>
					) : (
						<Fragment>
							<Tooltip title='Account settings'>
								<IconButton
									onClick={handleClick}
									size='small'
									aria-controls={open ? 'account-menu-setting' : undefined}
									aria-haspopup='true'
									aria-expanded={open ? 'true' : undefined}
								>
									<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								id='account-menu-setting'
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<MenuItem onClick={handleClose}>
									<Avatar sx={{ width: '30px', height: '30px', mr: 1 }} />
									<Typography>{user.fullname}</Typography>
								</MenuItem>
								<Divider />
								<MenuItem onClick={handleClose}>
									<ListItemIcon>
										<PersonAdd fontSize='small' />
									</ListItemIcon>
									Add another account
								</MenuItem>
								<Link to='/account'>
									<MenuItem
										onClick={handleClose}
										sx={{ color: 'black' }}
									>
										<ListItemIcon>
											<AccountCircleIcon fontSize='small' />
										</ListItemIcon>
										Profile
									</MenuItem>
								</Link>
								<MenuItem onClick={handleLogout}>
									<ListItemIcon>
										<Logout fontSize='small' />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</Fragment>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Header
