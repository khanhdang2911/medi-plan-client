import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'

import images from '~/assets'

const contactInfo = [
  {
    title: 'Công ty tự sáng tạo DXK',
    icon: <BusinessIcon />,
    content: 'Địa chỉ: 123 đường ABC, phường XYZ, quận 123, TP.HCM',
  },
  {
    title: '',
    icon: <PhoneIcon />,
    content: '+1234-567-890',
  },
  {
    title: '',
    icon: <MailIcon />,
    content: 'support@demo.vn (7-20h)',
  },
  {
    title: 'Văn phòng tại thành phố Hà Nội',
    icon: <BusinessIcon />,
    content: 'Địa chỉ: 123 đường ABC, phường XYZ, quận 123, TP.Hà Nội',
  },
]

const contactLinks = [
  { label: 'Liên hệ hợp tác', to: '/' },
  { label: 'Chính sách bảo mật', to: '/' },
  { label: 'Quy chế hoạt động', to: '/' },
  { label: 'Tuyển dụng', to: '/' },
  { label: 'Điều khoản sử dụng', to: '/' },
  { label: 'Câu hỏi thường gặp', to: '/' },
]
const partners = [
  {
    img: images.bernard,
    title: 'Hệ thống y khoa chuyên sâu quốc tế Bernard',
    content: 'Bảo trợ chuyên mục nội dung "y khoa chuyên sâu',
  },
  {
    img: images.doctorcheck,
    title: 'Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn',
    content: 'Bảo trợ chuyên mục nội dung "sức khỏe tổng quát',
  },
  {
    img: images.hellodoctor,
    title: 'Hello Doctor',
    content: 'Bảo trợ chuyên mục nội dung "sức khỏe tinh thần',
  },
]
function Footer() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#efefef' }}>
        <Box
          sx={{
            width: (theme) => theme.booking_care.WIDTH_COMMON,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
          }}
        >
          <Box sx={{ width: '467px' }}>
            {contactInfo.map((info, index) => {
              return <ContactInfo key={index} title={info.title} icon={info.icon} content={info.content} />
            })}
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <img width="94px" height="36px" src={images.bocongthuong} alt="bocongthuong" />
              <img width="94px" height="36px" src={images.bocongthuong} alt="bocongthuong" />
            </Box>
          </Box>
          <Box sx={{ width: '233px' }}>
            <Box sx={{ padding: '5px 0' }}>
              <img width="140px" height="30px" src={images.logo} alt="logo" />
            </Box>
            {contactLinks.map((link, index) => {
              return <ContactLink key={index} label={link.label} to={link.to} />
            })}
          </Box>
          <Box sx={{ width: '467px' }}>
            <Typography sx={{ fontWeight: '600' }}>Đối tác bảo trợ nội dung</Typography>
            {partners.map((partner, index) => {
              return <Partner key={index} img={partner.img} title={partner.title} content={partner.content} />
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: 'rgb(100, 185, 229)', display: 'flex', justifyContent: 'center', height: '90px' }}>
        <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
          <Typography sx={{ padding: '10px', color: 'white' }}>© 2024 DemoMedi-plan.</Typography>
        </Box>
      </Box>
    </Box>
  )
}

function ContactInfo({ title, icon, content }) {
  return (
    <>
      {title && <Typography sx={{ fontSize: '0.9rem', fontWeight: '600' }}>{title}</Typography>}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', padding: '5px 0' }}>
        {icon}
        <Typography sx={{ fontSize: '0.9rem' }}>{content}</Typography>
      </Box>
    </>
  )
}

function ContactLink({ label, to }) {
  return (
    <Link to={to}>
      <Typography sx={{ color: 'rgb(69, 195, 210)', fontSize: '14px', fontWeight: '600', padding: '3px 0' }}>
        {label}
      </Typography>
    </Link>
  )
}
function Partner({ img, title, content }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 0' }}>
      <img width="64px" height="64px" src={img} alt="partner" style={{ objectFit: 'cover' }} />
      <Box>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: '600' }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>{content}</Typography>
      </Box>
    </Box>
  )
}
export default Footer
