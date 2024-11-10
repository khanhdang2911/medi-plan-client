import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { keyframes } from '@mui/system'

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(243, 243, 243, 0.9)',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: `${spinAnimation} 0.7s linear infinite`,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      ></Box>
      <Typography
        sx={{
          color: '#fff',
          marginTop: '5px',
          fontWeight: 'bold',
        }}
      >
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading
