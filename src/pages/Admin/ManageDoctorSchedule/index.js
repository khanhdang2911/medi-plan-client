import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { createScheduleForDoctor, getAllDoctors, getAllTimeSpace } from '~/services/api/doctor.api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ToastContainerCustom from '~/components/ToastContainerCustom'
import { notifyError, notifySuccess } from '~/helpers/notify'
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
        console.log(error)
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
        console.log(error)
      }
    }
    fetchAllDoctorData()
    fetchAllTimeSpace()
  }, [])
  const handleOnChangeOption = async (selectedOption) => {
    setSelectedOption(selectedOption)
    //call api get schedule for doctor
  }
  const handleChangeDate = (date) => {
    setDate(date)
    //call api get schedule for doctor at date selected
  }
  const handleChooseTime = (id) => {
    const newAllTime = allTime.map((time) => {
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
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const dataCreate = selectedTime.map((time) => {
      return {
        doctorId: selectedOption.value,
        date: formattedDate,
        timeType: time.keyMap,
      }
    })
    //call api
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
