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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker background for contrast
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(243, 243, 243, 0.6)', // Lighter and more transparent border
          borderTop: '4px solid #3498db', // Blue top border
          borderRadius: '50%',
          animation: `${spinAnimation} 0.7s linear infinite`, // Smooth and continuous spin
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Add shadow for depth
        }}
      ></Box>
    </Box>
  )
}

export default Loading
