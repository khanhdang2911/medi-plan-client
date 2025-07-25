import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import KeyIcon from '@mui/icons-material/Key'
import { Link, Route, Routes } from 'react-router-dom'
import Profile from './Profile/Profile'
import ChangePasword from './ChangePassword/ChangePasword'
import AccountContainer from '~/styles/Account/Account.modules'
function Account() {
  return (
    <AccountContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
        <Box
          className="account-containter"
          sx={{
            width: (theme) => theme.booking_care.WIDTH_COMMON,
            mt: 2,
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            className="account-menu"
            sx={{ width: '25%', boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)', borderRadius: '8px' }}
          >
            <Box sx={{ bgcolor: (theme) => theme.booking_care.BG_COLOR, padding: '12px' }}>
              <Typography sx={{ fontWeight: '600', fontSize: '1.3rem', opacity: 0.9 }}>Thông tin tài khoản</Typography>
            </Box>
            <Link to="/account">
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
            <Link to="/account/change-password">
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
          <Box className="account-infomation" sx={{ width: '70%' }}>
            <Box sx={{ padding: '20px', boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}>
              {/* Routes to profile, change-password */}
              <Routes>
                <Route index element={<Profile />} />
                <Route path="change-password" element={<ChangePasword />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </AccountContainer>
  )
}

export default Account
