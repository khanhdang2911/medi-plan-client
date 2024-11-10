import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Carousel from 'react-multi-carousel'
import images from '~/assets/images'
import RemoteMedicalStyle from '~/styles/Home/RemoteMedical.modules'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 2000, min: 1200 },
    items: 3,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
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
var items = [
  {
    image: images.bacsicoxuongkhoptuxa,
    name: 'Bác sĩ cơ xương khớp từ xa',
  },
  {
    image: images.bacsidalieutuxa,
    name: 'Bác sĩ da liễu từ xa',
  },
  {
    image: images.bacsinoikhoatuxa,
    name: 'Bác sĩ nội khoa từ xa',
  },
  {
    image: images.bacsitieuhoatuxa,
    name: 'Bác sĩ tiêu hóa từ xa',
  },
  {
    image: images.suckhoetinhthantuxa,
    name: 'Sức khỏe tinh thần từ xa',
  },
  {
    image: images.tamlituxa,
    name: 'Tâm lí từ xa',
  },
]
function RemoteMedical() {
  return (
    <RemoteMedicalStyle>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0', width: '100%' }}>
        <Box sx={{ maxWidth: '100%', width: (theme) => theme.booking_care.WIDTH_COMMON }}>
          <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}>
            Khám từ xa
          </Typography>
          <Carousel
            className="handbook-carousel"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            arrows={true}
          >
            {items.map((item, index) => {
              return <Item key={index} {...item} />
            })}
          </Carousel>
        </Box>
      </Box>
    </RemoteMedicalStyle>
  )
}
function Item(item) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box
        className="remote-medical-item"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5px',
          border: '1px solid #c8d6e5',
          borderRadius: '10px',
          width: '380px',
        }}
      >
        <img className="remote-medical-image" src={item.image} alt="khamtuxa" />
        <Typography className="remote-medical-title" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
          {item.name}
        </Typography>
      </Box>
    </Box>
  )
}
export default RemoteMedical
