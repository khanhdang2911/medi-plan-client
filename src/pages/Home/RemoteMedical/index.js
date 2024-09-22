import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import images from '~/assets'

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
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
        <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}>
          Khám từ xa
        </Typography>
        <Carousel animation="slide" autoPlay={false} duration={1000} indicators={false}>
          {items.slice(0, 2).map((item, i) => (
            <ManyItem key={i} manyItems={items.slice(i * 3, i * 3 + 3)} />
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
              border: '1px solid #c8d6e5',
              borderRadius: '10px',
              width: '341px',
            }}
          >
            <img src={item.image} alt="khamtuxa" width="329" height="215" style={{ objectFit: 'cover' }} />
            <Typography sx={{ fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}
export default RemoteMedical
