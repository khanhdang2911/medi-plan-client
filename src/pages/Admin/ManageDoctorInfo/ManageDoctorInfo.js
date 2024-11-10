import 'react-toastify/dist/ReactToastify.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Typography } from '@mui/material'
import { createDetailInfoDoctor, getAllDoctors, getDoctorById } from '~/services/api/doctor.api'
import ToastContainerCustom from '~/components/ToastContainerCustom/ToastContainerCustom'
import { notifyError, notifySuccess } from '~/helpers/notify'
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '60%',
    zIndex: 2,
  }),
}
function ManageDoctorInfo() {
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [doctorDescription, setDoctorDescription] = useState('')
  const [doctorDetail, setDoctorDetail] = useState('')
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
    fetchAllDoctorData()
  }, [])
  const handleOnChangeOption = async (selectedOption) => {
    setSelectedOption(selectedOption)
    const response = await getDoctorById(selectedOption.value)
    const data = response.data
    if (data.success) {
      const doctor = data.doctor
      if (doctor.DetailInfo) {
        setDoctorDetail(doctor.DetailInfo?.content || '')
        setDoctorDescription(doctor.DetailInfo?.description || '')
      }
    }
  }
  const handleValidateData = () => {
    if (!selectedOption) {
      notifyError('Vui lòng chọn bác sĩ')
      return false
    }
    if (!doctorDescription) {
      notifyError('Vui lòng nhập mô tả về bác sĩ')
      return false
    }
    if (!doctorDetail) {
      notifyError('Vui lòng nhập thông tin chi tiết về bác sĩ')
      return false
    }
    return true
  }
  const handleSaveInfo = async () => {
    const isValid = handleValidateData()
    if (!isValid) return
    // Call API to save data
    try {
      const response = await createDetailInfoDoctor({
        doctorId: selectedOption.value,
        description: doctorDescription,
        content: doctorDetail,
      })
      const data = response.data
      if (data.success) {
        notifySuccess('Lưu thông tin thành công')
      } else {
        notifyError('Lưu thông tin thất bại')
      }
    } catch (error) {
      notifyError('Lưu thông tin thất bại')
    }
  }
  return (
    <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>Tên bác sĩ:</Typography>
        <Select styles={customStyles} defaultValue={selectedOption} onChange={handleOnChangeOption} options={options} />
      </Box>
      {/* doctor description */}
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Mô tả về bác sĩ"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: '60%' }}
          onChange={(e) => setDoctorDescription(e.target.value)}
          value={doctorDescription}
        />
      </Box>

      <Box>
        {/* Make this label is beautiful */}
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>
          Thông tin chi tiết về bác sĩ, kinh nghiệm làm việc, chuyên môn:
        </Typography>

        <Editor
          apiKey={process.env.REACT_APP_TINY_API_KEY}
          init={{
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
          value={doctorDetail}
          onEditorChange={(content) => setDoctorDetail(content)}
        />
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

export default ManageDoctorInfo
