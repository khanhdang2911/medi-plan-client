import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import Avatar from '@mui/material/Avatar'
import images from '~/assets'

var items = [
  {
    image: images.bacsicoxuongkhoptuxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Cơ xương khớp',
  },
  {
    image: images.bacsidalieutuxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Hô hấp - Phổi',
  },
  {
    image: images.bacsinoikhoatuxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Thần kinh - Não',
  },
  {
    image: images.bacsitieuhoatuxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Ngoại thần kinh',
  },
  {
    image: images.suckhoetinhthantuxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Viêm gan - Máu',
  },
  {
    image: images.tamlituxa,
    name: 'Bác sĩ chuyên khoa Anberlin',
    speciaty: 'Sức khỏe tâm thần',
  },
]
function OutstandingDoctor() {
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
              borderRadius: '10px',
              width: '341px',
            }}
          >
            <Avatar
              sx={{ width: '200px', height: '200px' }}
              src="https://cdn.bookingcare.vn/fo/w384/2019/09/04/094041pho-giao-su-nguyen-van-lieu.jpg"
            />
            <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', mt: 1 }}>{item.name}</Typography>
            <Typography sx={{ fontSize: '1rem', mt: 1 }}>{item.speciaty}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}
export default OutstandingDoctor
