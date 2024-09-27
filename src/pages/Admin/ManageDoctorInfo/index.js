import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Typography } from '@mui/material'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '60%',
    zIndex: 2,
  }),
}
function ManageDoctorInfo() {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#0984e3' }}>Tên bác sĩ:</Typography>
        <Select styles={customStyles} defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
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
        />
      </Box>
      <Box>
        <Button variant="contained" sx={{ color: 'white', fontWeight: 'bold', mb: '20px' }}>
          Lưu thông tin
        </Button>
      </Box>
    </Box>
  )
}

export default ManageDoctorInfo
