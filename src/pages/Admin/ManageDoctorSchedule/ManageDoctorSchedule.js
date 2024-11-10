import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {
  createScheduleForDoctor,
  getAllDoctors,
  getAllTimeSpace,
  getScheduleDoctorByDate,
} from '~/services/api/doctor.api'
import ToastContainerCustom from '~/components/ToastContainerCustom/ToastContainerCustom'
import { notifyError, notifySuccess } from '~/helpers/notify'
import formatDateFromString from '~/helpers/formatDateFromString'
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '60%',
    zIndex: 2,
  }),
}
function ManageDoctorSchedule() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([])
  const [allTime, setAllTime] = useState([])
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const fetchAllDoctorData = async () => {
      try {
        const response = await getAllDoctors()
        const data = response.data
        if (data.success) {
          const options = data.doctors.map((doctor) => ({
            value: doctor.id,
            label: doctor.fullname,
          }))
          setOptions(options)
        }
      } catch (error) {
        notifyError('Lấy dữ liệu thất bại')
      }
    }
    const fetchAllTimeSpace = async () => {
      try {
        const response = await getAllTimeSpace()
        const data = response.data
        if (data.success) {
          const customAllTimeSpace = data.allTimeSpace.map((time) => {
            return {
              ...time,
              selected: false,
            }
          })
          setAllTime(customAllTimeSpace)
        }
      } catch (error) {
        notifyError('Lấy dữ liệu thất bại')
      }
    }
    fetchAllDoctorData()
    fetchAllTimeSpace()
  }, [])
  //handle update highlight all time when change date, selected doctor
  useEffect(() => {
    const fetchScheduleDoctor = async () => {
      try {
        const response = await getScheduleDoctorByDate(formatDateFromString(date), selectedOption.value) //(date, id)
        const data = response.data
        const schedules = data.schedules
        if (schedules.length > 0) {
          const allTimeTemp = [...allTime]
          const newAllTime = allTimeTemp.map((item) => {
            return schedules.some((schedule) => schedule.timeType === item.keyMap)
              ? {
                  ...item,
                  selected: true,
                }
              : item
          })
          setAllTime(newAllTime)
        } else {
          const allTimeTemp = [...allTime]
          const newAllTime = allTimeTemp.map((item) => {
            return {
              ...item,
              selected: false,
            }
          })
          setAllTime(newAllTime)
        }
      } catch (error) {
        notifyError('Lấy dữ liệu thất bại')
      }
    }
    if (selectedOption && date) {
      fetchScheduleDoctor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedOption])
  const handleOnChangeOption = async (selectedOption) => {
    setSelectedOption(selectedOption)
    //call api get schedule for doctor
  }
  const handleChangeDate = (date) => {
    setDate(date)
  }
  const handleChooseTime = (id) => {
    const allTimeTemp = [...allTime]
    const newAllTime = allTimeTemp.map((time) => {
      return id === time.id
        ? {
            ...time,
            selected: !time.selected,
          }
        : time
    })
    setAllTime(newAllTime)
  }
  const handleValidateData = () => {
    if (!selectedOption) {
      notifyError('Vui lòng chọn bác sĩ')
      return false
    }
    const checkTime = allTime.some((time) => time.selected)
    if (!checkTime) {
      notifyError('Vui lòng chọn thời gian')
      return false
    }
    if (!date) {
      notifyError('Vui lòng chọn ngày')
      return false
    }
    return true
  }
  const handleSaveInfo = async () => {
    const checkData = handleValidateData()
    if (!checkData) return
    const selectedTime = allTime.filter((time) => time.selected)
    const formattedDate = formatDateFromString(date)
    const dataCreate = selectedTime.map((time) => {
      return {
        doctorId: selectedOption.value,
        date: formattedDate,
        timeType: time.keyMap,
      }
    })
    console.log(dataCreate)
    // call api
    try {
      const response = await createScheduleForDoctor(dataCreate)
      const data = response.data
      if (data.success === true) {
        notifySuccess('Lưu thông tin thành công')
      } else {
        console.log(data.message)
        notifyError('Lưu thông tin thất bại')
      }
    } catch (error) {
      notifyError('Lưu thông tin thất bại')
      console.log(error)
    }
  }
  return (
    <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>Tên bác sĩ:</Typography>
        <Select styles={customStyles} defaultValue={selectedOption} onChange={handleOnChangeOption} options={options} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>Ngày đặt lịch:</Typography>
        <DatePicker selected={date} onChange={handleChangeDate} inline minDate={new Date()} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>Thời gian:</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {allTime.map((time) => {
            return (
              <Button
                key={time.id}
                variant="outlined"
                sx={{
                  color: time.selected ? 'white' : '#00b894',
                  bgcolor: time.selected ? '#00b894' : 'white',
                  fontWeight: 'bold',
                  border: '1px solid #00b894',
                  '&:hover': {
                    bgcolor: time.selected ? '#00b894' : '#00b894',
                    color: time.selected ? 'white' : 'white',
                    border: '1px solid #00b894',
                  },
                }}
                onClick={() => handleChooseTime(time.id)}
              >
                {time.valueVi}
              </Button>
            )
          })}
        </Box>
      </Box>
      <Box>
        <Button onClick={handleSaveInfo} variant="contained" sx={{ color: 'white', fontWeight: 'bold', mb: '20px' }}>
          Lưu thông tin
        </Button>
      </Box>
      <ToastContainerCustom />
    </Box>
  )
}

export default ManageDoctorSchedule
