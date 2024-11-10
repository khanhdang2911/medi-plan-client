import { Box, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel'
import Avatar from '@mui/material/Avatar'
import images from '~/assets/images'
import { useEffect, useState } from 'react'
import { getTopDoctorHome } from '~/services/api/doctor.api'
import { Link } from 'react-router-dom'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 2000, min: 1200 },
    items: 4,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 576 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 2,
  },
}

function OutstandingDoctor() {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let response = await getTopDoctorHome(6)
        const data = response.data
        setDoctors(data.doctors)
      } catch (error) {}
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
        width: '100%',
      }}
    >
      <Box sx={{ maxWidth: '100%', width: (theme) => theme.booking_care.WIDTH_COMMON }}>
        <Typography className="doctor-title" variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '20px' }}>
          Bác sĩ nổi bật
        </Typography>
        <Carousel className="doctor-carousel" responsive={responsive} arrows={true}>
          {doctors.map((item, i) => {
            return <Item key={i} {...item} />
          })}
        </Carousel>
      </Box>
    </Box>
  )
}
function Item(item) {
  return (
    <Link to={`doctor-detail/${item.id}`}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
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
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1, // Limit the contents of the block to 2 lines
          }}
        >
          {item.positionData?.valueVi} {item.fullname}
        </Typography>
        <Typography sx={{ fontSize: '1rem', mt: 1 }}>Cơ xương khớp</Typography>
      </Box>
    </Link>
  )
}
export default OutstandingDoctor
