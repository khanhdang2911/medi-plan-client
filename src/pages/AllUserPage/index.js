import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Typography from '@mui/material/Typography'
import AddUserModal from '~/pages/AllUserPage/AddUserModal'
import EditUserModal from '~/pages/AllUserPage/EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import { getAllPosition, getAllRole, getAllUser } from '~/utils/api/auth.api'

const AllUserPage = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const [alert, setAlert] = useState({ severity: 'success', text: '' })
  const [allUserData, setAllUserData] = useState([])
  const [userEdit, setUserEdit] = useState({})
  const [userDeleteId, setUserDeleteId] = useState()
  const [positions, setPositions] = useState([])
  const [roles, setRole] = useState([])
  const navigate = useNavigate()
  //modal add user
  const [openModalAddUser, setOpenModalAddUser] = useState(false)
  const handleOpenModalAddUser = () => {
    setOpenModalAddUser(true)
  }
  const handleCloseModalAddUser = () => setOpenModalAddUser(false)

  //modal edit user
  const [openModalEditUser, setOpenModalEditUser] = useState(false)
  const handleOpenModalEditUser = async (user) => {
    setUserEdit(user)
    setOpenModalEditUser(true)
  }
  const handleCloseModalEditUser = () => {
    setOpenModalEditUser(false)
  }
  //modal delete user
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = (id) => {
    setUserDeleteId(id)
    setOpenDeleteModal(true)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  useEffect(() => {
    const fetchGetAllUser = async () => {
      try {
        const data = await getAllUser()
        setAllUserData(data.data.allUser)
        setAlert({
          severity: 'success',
          text: 'Get all user successfully!',
        })
        setOpenAlert(true)
      } catch (error) {
        navigate('/', {
          replace: true,
          state: {
            severity: 'error',
            text: `Unauthorization!!!`,
          },
        })
      }
    }
    fetchGetAllUser()
    const fetchPositionAndRole = async () => {
      try {
        const responsePosition = await getAllPosition()
        const positionsData = responsePosition.data.typeValues
        setPositions(positionsData)
        const responseRole = await getAllRole()
        const rolesData = responseRole.data.typeValues
        setRole(rolesData)
      } catch (error) {
        navigate('/', {
          replace: true,
          state: {
            severity: 'error',
            text: `Error from server !!!`,
          },
        })
      }
    }
    fetchPositionAndRole()
  }, [navigate])
  return (
    <>
      {allUserData.length > 0 && (
        <Box sx={{ padding: '20px 40px' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#0984e3', mb: '20px' }}>
            MANAGE USER
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: '20px', fontSize: '1.2rem' }}
            startIcon={<PersonAdd />}
            onClick={handleOpenModalAddUser}
          >
            Add new user
          </Button>
          <TableContainer component={Paper} sx={{ border: '1px solid' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead sx={{ fontSize: '1rem' }}>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUserData.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell>{row.fullname}</TableCell>
                    <TableCell>{row.phonenumber}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <IconButton
                          onClick={() => {
                            handleOpenModalEditUser(row)
                          }}
                          children={<EditIcon />}
                          sx={{ color: '#f1c40f' }}
                        />
                        <IconButton
                          onClick={() => {
                            handleOpenDeleteModal(row.id)
                          }}
                          children={<DeleteIcon />}
                          sx={{ color: '#e74c3c' }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
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
      <AddUserModal
        openModalAddUser={openModalAddUser}
        handleCloseModalAddUser={handleCloseModalAddUser}
        setAllUserData={setAllUserData}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
        positions={positions}
        roles={roles}
      />
      <EditUserModal
        openModalEditUser={openModalEditUser}
        handleCloseModalEditUser={handleCloseModalEditUser}
        setAllUserData={setAllUserData}
        allUserData={allUserData}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
        userEdit={userEdit}
        positions={positions}
        roles={roles}
      />
      <DeleteUserModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setAllUserData={setAllUserData}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
        userDeleteId={userDeleteId}
      />
    </>
  )
}

export default AllUserPage
