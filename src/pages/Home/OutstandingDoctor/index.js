import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import Avatar from '@mui/material/Avatar'
import images from '~/assets'
import { useEffect, useState } from 'react'
import { getTopDoctorHome } from '~/utils/api/doctor.api'

function OutstandingDoctor() {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let response = await getTopDoctorHome(6)
        const data = response.data
        setDoctors(data.doctors)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDoctors()
  }, [])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '20px',
        padding: '20px 0',
        backgroundImage: `url(${images.bg_bacsinoibat})`,
      }}
    >
      <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
        <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '20px' }}>
          Bác sĩ nổi bật
        </Typography>
        <Carousel animation="slide" autoPlay={false} duration={1000} navButtonsAlwaysVisible={true} indicators={false}>
          {doctors.slice(0, 2).map((doctor, i) => (
            <ManyItem key={doctor.id} manyItems={doctors.slice(i * 3, i * 3 + 3)} />
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}
function ManyItem(props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {props.manyItems.map((item, i) => {
        return (
          <Box
            key={i}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px',
              borderRadius: '10px',
              width: '341px',
              height: '300px',
            }}
          >
            <Avatar sx={{ width: '180px', height: '180px' }} src={item.image} />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '600',
                mt: 1,
                width: '70%',
                maxHeight: '50px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.positionData?.valueVi} {item.fullname}
            </Typography>
            <Typography sx={{ fontSize: '1rem', mt: 1 }}>Cơ xương khớp</Typography>
          </Box>
        )
      })}
    </Box>
  )
}
export default OutstandingDoctor
