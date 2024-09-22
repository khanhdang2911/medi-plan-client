import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

function Handbook() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
        <Typography variant="h5" sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}>
          Cẩm nang
        </Typography>
        <Carousel responsive={responsive} swipeable={true} draggable={true} arrows={false}>
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
  )
}

function HandbookItem() {
  return (
    <Box sx={{ width: '270px', cursor: 'pointer' }}>
      <Link to="/" draggable="false">
        <img
          width="270"
          height="140"
          draggable="false"
          style={{ objectFit: 'cover', borderRadius: '10px', userSelect: 'none' }}
          src="https://cdn.bookingcare.vn/fo/w384/2024/09/20/145209-review-he-thong-y-te-thu-cuc-tci.png"
          alt="handbook-item"
        />
        <Box sx={{ height: '72px' }}>
          <Typography
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
            tốt không, hướng dẫn đặt khám, đi khám dễ dàng, Hệ thống Y tế Thu Cúc TCI: Có tốt không, hướng dẫn đặt khám,
            đi khám dễ dàng
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}
export default Handbook
