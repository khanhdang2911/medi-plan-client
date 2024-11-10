import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import HandbookItemStyle from '~/styles/Home/HandbookItem.modules'
import { HandbookStyle } from '~/styles/Home/HandbookItem.modules'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 2000, min: 1200 },
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

function Handbook() {
  return (
    <HandbookStyle>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0', width: '100%' }}>
        <Box sx={{ maxWidth: '100%', width: (theme) => theme.booking_care.WIDTH_COMMON }}>
          <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}>
            Cẩm nang
          </Typography>
          <Carousel
            className="handbook-carousel"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            arrows={false}
          >
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
            <HandbookItem />
          </Carousel>
        </Box>
      </Box>
    </HandbookStyle>
  )
}

function HandbookItem() {
  return (
    <HandbookItemStyle>
      <Box sx={{ cursor: 'pointer' }} className="handbook-item">
        <Link to="/" draggable="false">
          <img
            className="handbook-item-image"
            draggable="false"
            style={{ objectFit: 'cover', borderRadius: '10px', userSelect: 'none' }}
            src="https://cdn.bookingcare.vn/fo/w640/2024/11/07/142502-phong-kham-da-lieu-ha-noi-p3.png"
            alt="handbook-item"
          />
          <Box sx={{ height: '72px' }}>
            <Typography
              className="handbook-item-title"
              sx={{
                mt: 2,
                fontSize: '1rem',
                fontWeight: '600',
                color: 'black',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // Limit the contents of the block to 2 lines
              }}
            >
              Hệ thống Y tế Thu Cúc TCI: Có tốt không, hướng dẫn đặt khám, đi khám dễ dàng,Hệ thống Y tế Thu Cúc TCI: Có
              tốt không, hướng dẫn đặt khám, đi khám dễ dàng, Hệ thống Y tế Thu Cúc TCI: Có tốt không, hướng dẫn đặt
              khám, đi khám dễ dàng
            </Typography>
          </Box>
        </Link>
      </Box>
    </HandbookItemStyle>
  )
}
export default Handbook
