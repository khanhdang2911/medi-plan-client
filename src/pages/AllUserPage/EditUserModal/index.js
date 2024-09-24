import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import { updateUserForAdmin } from '~/utils/api/auth.api'
import Loading from '~/components/Loading'

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

export default function EditUserModal({
  openModalEditUser,
  handleCloseModalEditUser,
  allUserData,
  setAllUserData,
  setAlert,
  setOpenAlert,
  userEdit,
  positions,
  roles,
}) {
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [allValues, setAllValues] = useState({
    email: '',
    fullname: '',
    phonenumber: '',
    address: '',
    gender: '',
    roleId: '',
    positionId: '',
  })
  useEffect(() => {
    // When open modal, set user data current to edit
    setAllValues({
      email: userEdit.email || '',
      fullname: userEdit.fullname || '',
      phonenumber: userEdit.phonenumber || '',
      address: userEdit.address || '',
      gender: userEdit.gender || '',
      roleId: userEdit.roleId || '',
      positionId: userEdit.positionId || '',
      image: userEdit.image || '',
    })
  }, [userEdit])
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
      setError('File không đúng định dạng ảnh')
      return false
    }
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png' && imageFile.type !== 'image/jpg') {
      setError('Chỉ được up ảnh dưới dạng jpg, jpeg, png')
      return false
    }
    if (imageFile) {
      const newImageURL = URL.createObjectURL(imageFile)
      setImageURL(newImageURL)
      setImageFile(imageFile)
    }
  }
  function handleValidate() {
    const allValueArray = Object.entries(allValues)
    console.log(allValueArray)
    for (let i = 0; i < allValueArray.length; i++) {
      if (!allValueArray[i][1].toString()) {
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
  const handleCancelEditUser = () => {
    setAllValues(userEdit)
    setImageURL('')
    setImageFile(null)
    setError('')
    handleCloseModalEditUser()
  }
  const handleSaveChangesUser = async () => {
    const check = handleValidate()
    if (!check) return
    //api update user
    setLoading(true)
    const formData = new FormData()
    formData.append('id', userEdit.id)
    for (let [key, value] in Object.entries(allValues)) {
      formData.append(key, value)
    }
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await updateUserForAdmin(formData)
    if (response.data?.success === false) {
      setLoading(false)
      setError(response.data?.message)
      return
    }
    setLoading(false)
    //Update user successfully
    handleCancelEditUser()
    //get all user again
    const updateUsers = allUserData.map((user) => {
      return user.id === userEdit.id ? response.data.user : user
    })
    setAllUserData(updateUsers)
    //set Alert
    setAlert({
      severity: 'success',
      text: 'Update user successfully!',
    })
    setOpenAlert(true)
  }
  const handleOnChangeValues = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAllValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      {loading && <Loading />}
      <Modal
        open={openModalEditUser}
        onClose={handleCancelEditUser}
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
        <Fade in={openModalEditUser}>
          <Box sx={style}>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>EDIT USER</Typography>
            <Typography sx={{ color: 'red' }}>{error}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: '100px', height: '100px' }} src={imageURL || userEdit.image} />
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Upload avatar
                <input onChange={handleUploadAvatar} type="file" hidden />
              </Button>
            </Box>
            <TextField
              id="outlined-basic-email"
              label="Email"
              value={allValues.email}
              disabled
              name="email"
              variant="outlined"
              size="small"
              sx={{ width: '100%' }}
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
                    value={allValues.gender ? '1' : '0'}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Button variant="contained" onClick={handleSaveChangesUser} sx={{ fontWeight: '500' }}>
                Save
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelEditUser}
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
