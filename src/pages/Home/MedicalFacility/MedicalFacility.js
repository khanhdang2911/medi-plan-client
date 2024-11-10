import { Box, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel'
import images from '~/assets/images'
import MedicalFacilityStyle from '~/styles/Home/MedicalFacility.modules'
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
    name: 'Bệnh viện hữu nghị Việt Đức',
  },
  {
    image: images.bacsidalieutuxa,
    name: 'Bệnh viện chợ Rẫy',
  },
  {
    image: images.bacsinoikhoatuxa,
    name: 'Doctor Check',
  },
  {
    image: images.bacsitieuhoatuxa,
    name: 'Phòng khám đại học Y Dược 1',
  },
  {
    image: images.suckhoetinhthantuxa,
    name: 'Trung tâm y tế quận 1',
  },
  {
    image: images.tamlituxa,
    name: 'Bênh viện ung bướu',
  },
]
function MedicalFacility() {
  return (
    <MedicalFacilityStyle>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
        <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
          <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}>
            Cơ sở y tế
          </Typography>
          <Carousel responsive={responsive} arrows={true}>
            {items.map((item, i) => (
              <Item key={i} {...item} />
            ))}
          </Carousel>
        </Box>
      </Box>
    </MedicalFacilityStyle>
  )
}
function Item(item) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box
        className="facility-item"
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
        <img
          className="facility-image"
          src="https://cdn.bookingcare.vn/fo/w384/2018/06/18/083122lo-go-viet-duc.jpg"
          alt="cosoyte"
        />
        <Typography
          className="facility-title"
          sx={{
            fontSize: '1.2rem',
            fontWeight: '600',
            mt: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            //make ... in 2 line when text is too long
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.name}
        </Typography>
      </Box>
    </Box>
  )
}
export default MedicalFacility
