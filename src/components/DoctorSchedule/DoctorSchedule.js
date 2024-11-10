import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useState, useEffect } from 'react'

import { ALL_DAYS_OF_WEEK } from '~/utils/constants'
import { Typography } from '@mui/material'
import { getScheduleDoctorByDate } from '~/services/api/doctor.api'
import { useNavigate, useParams } from 'react-router-dom'
import formatDate from '~/helpers/formatDate'

function DoctorSchedule() {
  const navigate = useNavigate()
  const params = useParams()
  const [nextFiveDay, setNextFiveDay] = useState([]) //value, label, date
  const [allSchedules, setAllSchedules] = useState([])
  const [date, setDate] = useState(() => {
    //Phai cong ngay hien tai len 1 vi chi lay 5 ngay tiep theo ke tu ngay mai
    var newDate = new Date(Date.now())
    if (newDate.getDay() === 6) {
      return 0
    }
    return formatDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() + 1)
  })
  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }
  useEffect(() => {
    const getNextFiveDays = () => {
      const DateGet = new Date(Date.now())
      const thisYear = DateGet.getFullYear()
      const thisDate = DateGet.getDate()
      const thisMonth = DateGet.getMonth() + 1
      const today = DateGet.getDay()
      let days = []
      for (let i = 1; i <= 5; i++) {
        let nextDay = (today + i) % 7
        days.push({
          value: formatDate(thisYear, thisMonth, thisDate + i),
          label: ALL_DAYS_OF_WEEK.find((item) => item.value === nextDay).label,
          date: {
            date: thisDate + i,
            month: thisMonth,
            year: thisYear,
          },
        })
      }
      setNextFiveDay(days)
    }
    getNextFiveDays()
  }, [])
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getScheduleDoctorByDate(date, params.id)
        const data = response.data
        console.log(data)
        if (data.success) {
          const schedules = data.schedules
          setAllSchedules(schedules)
        } else {
          navigate('/404')
        }
      } catch (error) {
        navigate('/')
      }
    }
    fetchSchedule()
  }, [date, navigate, params.id])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
      <Box
        className="doctor-schedule-container"
        sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON, display: 'flex', justifyContent: 'space-between' }}
      >
        <Box className="doctor-schedule-detail" sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControl sx={{ width: 150 }}>
            <Select
              size="small"
              value={date}
              onChange={handleChangeDate}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {nextFiveDay.length > 0 &&
                nextFiveDay.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label} - {item.date?.date}/{item.date?.month}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CalendarMonthIcon sx={{ width: '16px', height: '16px' }} />
            <Typography sx={{ fontWeight: '600', opacity: 0.8 }}>Lịch khám</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {allSchedules.length > 0 ? (
              allSchedules.map((item) => {
                return (
                  <Box
                    sx={{
                      width: '120px',
                      bgcolor: '#eeeeee',
                      padding: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      '&:hover': {
                        border: '2px solid #0984e3',
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', opacity: 0.8 }}>{item.timeTypeData.valueVi}</Typography>
                  </Box>
                )
              })
            ) : (
              <Typography sx={{ color: 'gray' }}>Bác sĩ không có lịch khám trong thời gian này</Typography>
            )}
          </Box>
          <Box>
            <Typography sx={{ fontSize: '0.8rem', opacity: 0.9 }}>Chọn và đặt (Phí đặt lịch 0đ)</Typography>
          </Box>
        </Box>
        <Box className="doctor-hospital-info" sx={{ width: '50%' }}>
          <Box sx={{ pt: 1, borderBottom: '1px solid gray' }}>
            <Typography sx={{ color: 'gray' }}>ĐỊA CHỈ KHÁM</Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: '600' }}>Bệnh viện quốc tế City</Typography>
            <Typography sx={{ fontSize: '0.8rem', opacity: '0.9' }}>
              3 Đường Số 17A, Bình Trị Đông B, Bình Tân, Thành phố Hồ Chí Minh
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
            <Typography sx={{ color: 'gray' }}>GIÁ KHÁM:</Typography>
            <Typography>400.000đ</Typography>
            <Typography sx={{ color: (theme) => theme.booking_care.BG_COLOR, fontWeight: '600' }}>
              Xem chi tiết
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorSchedule
