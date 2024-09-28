import { Avatar, Button, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ShareIcon from '@mui/icons-material/Share'
import parse from 'html-react-parser'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDoctorById } from '~/services/api/doctor.api'
function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      try {
        const response = await getDoctorById(id)
        const data = response.data
        if (data.success) {
          setDoctor(data.doctor)
        } else {
          navigate('/404')
        }
      } catch (error) {
        navigate('/404')
      }
    }
    fetchData()
  }, [id, navigate])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON, padding: '20px 0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box>
              <Avatar sx={{ width: '130px', height: '130px' }} src={doctor.image || ''} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '70%' }}>
              <Typography variant="h5" sx={{ fontWeight: '600' }}>
                {doctor?.positionData?.valueVi} {doctor.fullname}
              </Typography>
              <Typography sx={{ color: '#57606f', fontSize: '0.9rem' }}>{doctor?.DetailInfo?.description}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<ThumbUpIcon />}
                  size="small"
                  sx={{ bgcolor: '#1e90ff', '&:hover': { bgcolor: '#1e90ff' } }}
                >
                  Thích
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ShareIcon />}
                  size="small"
                  sx={{ bgcolor: '#1e90ff', '&:hover': { bgcolor: '#1e90ff' } }}
                >
                  Chia sẻ
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ bgcolor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON, padding: '20px 0' }}>
          {parse(`${doctor?.DetailInfo?.content}`)}
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorDetail
