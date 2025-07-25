import Box from '@mui/material/Box'
import { Fragment, useState } from 'react'
import images from '~/assets/images'
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
import { logOutUser } from '~/services/api/auth.api'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '~/redux/selectors'
import { useDispatch } from 'react-redux'
import authSlice from '~/redux/authSlice'
import HeaderStyle from '~/styles/Layout/Header.modules'
import CustomDrawer from '~/components/CustomDrawer/CustomDrawer'
export const serviceLinks = [
  { to: '/', label: 'Lịch hẹn', image: images.appointment },
  { to: '/', label: 'Hỗ trợ', image: images.help },
]

export const menuItems = [
  { to: '/', label: 'Tất cả' },
  { to: '/in-home', label: 'Tại nhà' },
  { to: '/in-hospital', label: 'Tại viện' },
  { to: '/live-healthy', label: 'Sống khỏe' },
]

function Header() {
  const navigate = useNavigate()
  const auth = useSelector(getAuthSelector)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    try {
      await logOutUser()
      dispatch(authSlice.actions.logout())
      navigate('/')
    } catch (error) {}
  }
  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  return (
    <HeaderStyle>
      <CustomDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <Box
        className="header-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          height: (theme) => theme.booking_care.HEADER_HEIGHT,
          bgcolor: 'rgb(237 255 250/ 1)',
        }}
      >
        <Box
          className="header-content"
          sx={{
            width: (theme) => theme.booking_care.WIDTH_COMMON,
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              onClick={handleOpenDrawer}
              sx={{ width: '35px', height: '35px', minWidth: 0, display: 'none' }}
              className="button-drawer"
            >
              <img width="35px" height="35px" src={images.navbar} alt="navbar" loading="lazy" />
            </Button>
            <Link to="/">
              <img width="200px" height="43px" src={images.logo} alt="logo" loading="lazy" />
            </Link>
          </Box>
          <Box
            className="menu-items"
            sx={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%', ml: '10px', pl: 1, pr: 1 }}
          >
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
              className="search-input"
              id="outlined-basic-search"
              label="Search"
              variant="outlined"
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '20px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', ml: '20px' }}>
            {serviceLinks.map((item, index) => {
              return (
                <Link to={item.to} className="service-link" key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={item.image} alt="lich hen" width="26" height="26" loading="lazy" />
                    <Typography sx={{ color: 'rgb(69, 195, 210)', fontSize: '14px', fontWeight: 'bold' }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Link>
              )
            })}

            {!auth.isAuthenticated ? (
              <Link to="/login">
                <Button
                  variant="outlined"
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
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu-setting' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    {auth.user?.image ? (
                      <Avatar src={auth.user?.image} />
                    ) : (
                      <Avatar sx={{ width: 32, height: 32 }}>{auth.user?.fullname[0]}</Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu-setting"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    {auth.user?.image ? (
                      <Avatar src={auth.user?.image} sx={{ width: '30px', height: '30px', mr: 1 }} />
                    ) : (
                      <Avatar sx={{ width: '30px', height: '30px', mr: 1 }}>{auth.user?.fullname[0]}</Avatar>
                    )}
                    <Typography>{auth.user?.fullname}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <Link to="/account">
                    <MenuItem onClick={handleClose} sx={{ color: 'black' }}>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </HeaderStyle>
  )
}

export default Header
