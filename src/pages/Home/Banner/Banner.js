import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined'
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined'
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined'
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import MoodBadIcon from '@mui/icons-material/MoodBad'

import BannerStyle from '~/styles/Home/Banner.modules'
const ALL_SERVICES = [
  {
    text: 'Khám chuyên khoa',
    icon: <MedicationLiquidOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
  {
    text: 'Khám từ xa',
    icon: <ContactPhoneOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
  {
    text: 'Khám tổng quát',
    icon: <EventNoteOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
  {
    text: 'Xét nghiệm y học',
    icon: <BloodtypeOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
  {
    text: 'Sức khỏe tinh thần',
    icon: <PsychologyAltOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
  {
    text: 'Khám nha khoa',
    icon: <MoodBadIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
  },
]
const BannerHome = () => {
  return (
    <BannerStyle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'rgb(146 215 239)',
          padding: '20px 0',
          width: '100%',
        }}
      >
        <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '20px' }}>
            <Typography className="banner-title" sx={{ fontWeight: '500', fontSize: '2.5rem' }}>
              Nơi khởi nguồn của sức khỏe
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '15px' }}>
            <Box
              className="search-box"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 0',
                width: '100%',
                bgcolor: 'white',
                borderRadius: '20px',
              }}
            >
              <TextField
                placeholder="Đặt câu hỏi với trợ lí AI"
                sx={{
                  width: '100%',
                  outline: 'none',
                  '& fieldset': {
                    display: 'none',
                  },
                  '.MuiOutlinedInput-input': {
                    fontSize: '1.5rem !important',
                    fontWeight: '500 !important',
                  },
                }}
              ></TextField>
              <IconButton
                children={<SendIcon />}
                sx={{
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              />
            </Box>
          </Box>
          <Box className="service-box" sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
            <Box
              className="service-list"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              {ALL_SERVICES.map((service, index) => {
                return (
                  <Box
                    className="service-item"
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '5px',
                      bgcolor: 'white',
                      padding: '10px',
                      border: '1px solid grey',
                      borderRadius: '12px',
                      minWidth: '40px',
                    }}
                  >
                    <span className="service-icon">{service.icon}</span>
                    <Typography
                      className="service-text"
                      sx={{ fontSize: '0.8rem', color: 'black', fontWeight: '600', opacity: '0.8' }}
                    >
                      {service.text}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </BannerStyle>
  )
}
export default BannerHome
