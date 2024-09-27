import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Divider from '@mui/material/Divider'
import { deleteUser } from '~/services/api/auth.api'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}

export default function DeleteUserModal({
  openDeleteModal,
  setOpenDeleteModal,
  setAlert,
  setOpenAlert,
  setAllUserData,
  userDeleteId,
}) {
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userDeleteId)
      if (response.data?.errCode !== 0 && response.data?.errMessage) {
        setAlert({
          severity: 'error',
          text: response.data.errMessage,
        })
        setOpenAlert(true)
        return
      } else {
        setAlert({
          severity: 'success',
          text: 'Delete user successfully',
        })
        setOpenAlert(true)
      }
      //Close modal
      handleCloseDeleteModal()
      //Call api re-render all user page again
      setAllUserData((prev) => prev.filter((user) => user.id !== userDeleteId))
    } catch (error) {
      setAlert({
        severity: 'error',
        text: error.message,
      })
      setOpenAlert(true)
    }
  }
  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <WarningAmberIcon sx={{ color: 'red' }} />
            <Typography variant="h6" component="h2">
              Confirm delete
            </Typography>
          </Box>
          <Divider />
          <Typography>Are you sure want to delete this user?</Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
            <Button onClick={handleCloseDeleteModal} variant="contained" sx={{ fontWeight: '500' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              sx={{ bgcolor: '#ff7675', '&:hover': { bgcolor: '#ff7675' }, fontWeight: '500' }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
