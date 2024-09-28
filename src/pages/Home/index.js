import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BannerHome from './Banner'
import RemoteMedical from './RemoteMedical'
import MedicalFacility from './MedicalFacility'
import OutstandingDoctor from './OutstandingDoctor'
import Handbook from './Handbook'
import ToastContainerCustom from '~/components/ToastContainerCustom'
import { notifyError } from '~/helpers/notify'

function Home() {
  //
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state) {
      notifyError(location.state)
      navigate('/', { replace: true })
    }
  }, [location.state, navigate])

  return (
    <Box>
      {/* Noi khoi nguon suc khoe */}
      <BannerHome />
      {/* Kham tu xa */}
      <RemoteMedical />
      {/* Co so y te */}
      <MedicalFacility />
      {/* Bac si noi bat */}
      <OutstandingDoctor />
      {/* Cam nang */}
      <Handbook />
      {/* Alert */}
      <ToastContainerCustom />
    </Box>
  )
}

export default Home
