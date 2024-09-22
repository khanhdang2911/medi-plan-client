import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import KeyIcon from '@mui/icons-material/Key'
import { changePassword } from '~/utils/api/auth.api'
function ChangePasword() {
  const [allValues, setAllValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [alert, setAlert] = useState({ severity: 'success', text: '' })
  const [openAlert, setOpenAlert] = useState(false)
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setAllValues({ ...allValues, [name]: value })
  }
  const handleValidate = () => {
    if (allValues.oldPassword === '' || allValues.newPassword === '' || allValues.confirmPassword === '') {
      setError('Vui lòng nhập đủ thông tin')
      return false
    }
    if (allValues.newPassword !== allValues.confirmPassword) {
      setError('Xác nhận mật khẩu không chính xác')
      return false
    }
    return true
  }
  const handleSubmit = async () => {
    const check = handleValidate()
    if (!check) {
      return
    }
    try {
      const response = await changePassword({
        oldPassword: allValues.oldPassword,
        newPassword: allValues.newPassword,
      })
      const data = response.data
      if (data.success === true) {
        setAlert({ severity: 'success', text: 'Thay đổi mật khẩu thành công' })
        setError('')
        setOpenAlert(true)
        setAllValues({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else if (data.success === false) {
        setError(data.message)
      }
    } catch (error) {
      setAlert({ severity: 'error', text: 'Thay đổi mật khẩu thất bại' })
      setError('')
      setOpenAlert(true)
      setAllValues({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }
  return (
    <>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', opacity: 0.9 }}>Thay đổi mật khẩu</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box sx={{ width: '80%' }}>
          <Typography sx={{ color: 'red', ml: 1 }}>{error}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{ minWidth: '200px' }}>Mật khẩu cũ</Typography>
            </Box>

            <TextField
              name="oldPassword"
              value={allValues.oldPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ minWidth: '400px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{ minWidth: '200px' }}>Mật khẩu mới</Typography>
            </Box>

            <TextField
              name="newPassword"
              value={allValues.newPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ minWidth: '400px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{ minWidth: '200px' }}>Nhập lại mật khẩu</Typography>
            </Box>

            <TextField
              name="confirmPassword"
              value={allValues.confirmPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ minWidth: '400px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
            <Button variant="contained" sx={{ fontWeight: '600' }} onClick={handleSubmit}>
              Xác nhận
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
        <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
          {alert.text}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ChangePasword
