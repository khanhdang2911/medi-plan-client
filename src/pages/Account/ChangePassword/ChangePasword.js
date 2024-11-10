import { Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import KeyIcon from '@mui/icons-material/Key'
import { changePassword } from '~/services/api/auth.api'
import ToastContainerCustom from '~/components/ToastContainerCustom/ToastContainerCustom'
import { notifyError, notifySuccess } from '~/helpers/notify'
function ChangePasword() {
  const [allValues, setAllValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

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
        notifySuccess('Thay đổi mật khẩu thành công')
        setError('')
        setAllValues({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else if (data.success === false) {
        setError(data.message)
      }
    } catch (error) {
      notifyError('Thay đổi mật khẩu thất bại')
      setError('')
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
      <Box sx={{ mt: 1 }}>
        <Box className="change-password-container" sx={{ width: '80%' }}>
          <Typography sx={{ color: 'red', ml: 1 }}>{error}</Typography>
          <Box
            className="change-password-area"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{}}>Mật khẩu cũ</Typography>
            </Box>

            <TextField
              className="change-password-input"
              name="oldPassword"
              value={allValues.oldPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ width: '70%' }}
            />
          </Box>
          <Box
            className="change-password-area"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{}}>Mật khẩu mới</Typography>
            </Box>

            <TextField
              className="change-password-input"
              name="newPassword"
              value={allValues.newPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ width: '70%' }}
            />
          </Box>
          <Box
            className="change-password-area"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <KeyIcon />
              <Typography sx={{}}>Nhập lại mật khẩu</Typography>
            </Box>

            <TextField
              className="change-password-input"
              name="confirmPassword"
              value={allValues.confirmPassword}
              onChange={(e) => handleOnChange(e)}
              type="password"
              size="small"
              sx={{ width: '70%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
            <Button variant="contained" sx={{ fontWeight: '600' }} onClick={handleSubmit}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainerCustom />
    </>
  )
}

export default ChangePasword
