import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import { createUserForAdmin } from '~/services/api/auth.api'
import Loading from '~/components/Loading/Loading'
import { notifyError, notifySuccess } from '~/helpers/notify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}

export default function AddUserModal({ openModalAddUser, handleCloseModalAddUser, setAllUserData, positions, roles }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [allValues, setAllValues] = useState({
    email: '',
    fullname: '',
    password: '',
    phonenumber: '',
    address: '',
    gender: '',
    roleId: '',
    positionId: '',
  })
  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL)
      }
    }
  }, [imageURL])
  const handleUploadAvatar = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile.type.split('/')[0] !== 'image') {
      notifyError('File không hợp lệ')
      return false
    }
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png' && imageFile.type !== 'image/jpg') {
      notifyError('Chỉ được up ảnh có dạng .jpeg, .jpg, .png')
      return false
    }
    if (imageFile) {
      const newImageURL = URL.createObjectURL(imageFile)
      setImageURL(newImageURL)
      setImageFile(imageFile)
    }
  }
  const handleValidate = () => {
    const allValueArray = Object.entries(allValues)
    for (let i = 0; i < allValueArray.length; i++) {
      if (!allValueArray[i][1]) {
        setError(`Please enter your ${allValueArray[i][0]}`)
        return false
      }
    }
    //Check email
    if (!/^\S+@\S+\.\S+$/.test(allValues.email)) {
      setError('Please enter a valid email')
      return false
    }
    //Check phone number is 10 digits and not contain any character
    if (!/^\d{10}$/.test(allValues.phonenumber)) {
      setError('Please enter a valid phone number (10 digits)')
      return false
    }
    return true
  }
  const handleCreateUser = async () => {
    const check = handleValidate()
    if (!check) return
    //Call api
    setLoading(true)
    const formData = new FormData()
    //loop through allValues and append to formData
    for (const [key, value] of Object.entries(allValues)) {
      formData.append(key, value)
    }
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await createUserForAdmin(formData)
    if (response.data?.success === false) {
      setLoading(false)
      setError(response.data?.message)
      return
    }
    setLoading(false)
    //Create user successfully
    handleCancelCreateUser()
    //get all user again
    setAllUserData((prev) => [...prev, response.data.user])
    //set Alert
    notifySuccess('Create user successfully')
  }
  const handleOnChangeValues = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAllValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancelCreateUser = () => {
    setAllValues({
      email: '',
      fullname: '',
      password: '',
      phonenumber: '',
      address: '',
      gender: '',
      roleId: '',
      positionId: '',
    })
    setError('')
    setImageURL('')
    setImageFile(null)
    handleCloseModalAddUser()
  }
  return (
    <div>
      {loading && <Loading />}
      <Modal
        open={openModalAddUser}
        onClose={handleCancelCreateUser}
        aria-labelledby="modal-modal-title-add-user"
        aria-describedby="modal-modal-description-add-user"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalAddUser}>
          <Box sx={style}>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>CREATE NEW USER</Typography>
            <Typography sx={{ color: 'red' }}>{error}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: '100px', height: '100px' }} src={imageURL} />
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Upload avatar
                <input onChange={handleUploadAvatar} type="file" hidden />
              </Button>
            </Box>

            <TextField
              id="outlined-basic-email"
              label="Email"
              value={allValues.email}
              name="email"
              variant="outlined"
              size="small"
              sx={{ width: '100%' }}
              onChange={(e) => handleOnChangeValues(e)}
            />
            <TextField
              id="outlined-basic-password"
              type="password"
              value={allValues.password}
              label="Password"
              name="password"
              variant="outlined"
              size="small"
              onChange={(e) => handleOnChangeValues(e)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                id="outlined-basic-fullname"
                label="Fullname"
                value={allValues.fullname}
                name="fullname"
                variant="outlined"
                size="small"
                sx={{ width: '50%' }}
                onChange={(e) => handleOnChangeValues(e)}
              />
              <TextField
                id="outlined-basic-phonenumber"
                label="Phone number"
                value={allValues.phonenumber}
                name="phonenumber"
                variant="outlined"
                size="small"
                onChange={(e) => handleOnChangeValues(e)}
              />
            </Box>
            <TextField
              id="outlined-basic-address"
              label="Address"
              value={allValues.address}
              name="address"
              variant="outlined"
              size="small"
              onChange={(e) => handleOnChangeValues(e)}
              sx={{ width: '100%' }}
            />
            {/* Select area */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <InputLabel id="gender-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-simple-select-label"
                    id="gender-simple-select"
                    name="gender"
                    value={allValues.gender}
                    label="Gender"
                    onChange={(e) => handleOnChangeValues(e)}
                  >
                    <MenuItem value="1">Male</MenuItem>
                    <MenuItem value="0">Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <InputLabel id="roleId-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="roleId-simple-select-label"
                    id="roleId-simple-select"
                    name="roleId"
                    value={allValues.roleId}
                    label="Role"
                    onChange={(e) => handleOnChangeValues(e)}
                  >
                    {roles.map((role, index) => {
                      return (
                        <MenuItem key={index} value={role.keyMap}>
                          {role.valueEn}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <InputLabel id="positionId-simple-select-label">Position</InputLabel>
                  <Select
                    labelId="positionId-simple-select-label"
                    id="positionId-simple-select"
                    name="positionId"
                    value={allValues.positionId}
                    label="Position"
                    onChange={(e) => handleOnChangeValues(e)}
                  >
                    {positions.map((position, index) => {
                      return (
                        <MenuItem key={index} value={position.keyMap}>
                          {position.valueEn}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 2 }}>
              <Button variant="contained" onClick={handleCreateUser} sx={{ fontWeight: '500' }}>
                Create
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelCreateUser}
                sx={{ bgcolor: '#ff7675', '&:hover': { bgcolor: '#ff7675' }, fontWeight: '500' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
