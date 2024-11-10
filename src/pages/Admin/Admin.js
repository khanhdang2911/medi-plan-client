import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import images from '~/assets/images'
import AllUserPage from './AllUserPage/AllUserPage'
import ManageDoctorInfo from './ManageDoctorInfo/ManageDoctorInfo'
import ManageDoctorSchedule from './ManageDoctorSchedule/ManageDoctorSchedule'
function Admin() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '15%', position: 'fixed' }}>
        <Box sx={{ width: '100%', height: '100px' }}>
          <Link to="/">
            <img src={images.logo} alt="logo" width="100%" height="100%" />
          </Link>
        </Box>
        <Divider />
        <Box sx={{ width: '100%', height: 'calc(100vh - 100px)', bgcolor: '' }}>
          <NavLink to="/admin" end>
            {({ isActive }) => (
              <Typography
                sx={{
                  color: isActive ? '#1e90ff' : '#2c3e50',
                  fontWeight: '600',
                  padding: '4px 2px',
                  '&:hover': {
                    bgcolor: '#f1f2f6',
                  },
                }}
              >
                Manage User
              </Typography>
            )}
          </NavLink>
          <NavLink to="/admin/manage-doctor-info">
            {({ isActive }) => (
              <Typography
                sx={{
                  color: isActive ? '#1e90ff' : '#2c3e50',
                  fontWeight: '600',
                  padding: '4px 2px',
                  '&:hover': {
                    bgcolor: '#f1f2f6',
                  },
                }}
              >
                Manage Doctor Info
              </Typography>
            )}
          </NavLink>
          <NavLink to="/admin/manage-doctor-schedule">
            {({ isActive }) => (
              <Typography
                sx={{
                  color: isActive ? '#1e90ff' : '#2c3e50',
                  fontWeight: '600',
                  padding: '4px 2px',
                  '&:hover': {
                    bgcolor: '#f1f2f6',
                  },
                }}
              >
                Manage Doctor Schedule
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>
      <Box sx={{ width: '85%', ml: '15%', bgcolor: '#dff9fb' }}>
        <Box
          sx={{
            width: '100%',
            height: '100px',
            position: 'fixed',
            zIndex: '10',
            bgcolor: '#dff9fb',
            borderBottom: '1px solid #c7ecee',
          }}
        >
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              pl: '20px',
            }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ mt: '100px' }}>
          <Routes>
            <Route index element={<AllUserPage />} />
            <Route path="manage-doctor-info" element={<ManageDoctorInfo />}></Route>
            <Route path="manage-doctor-schedule" element={<ManageDoctorSchedule />}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default Admin
