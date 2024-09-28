import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
  booking_care: {
    HEADER_HEIGHT: '78px',
    WIDTH_COMMON: '1208px',
    BG_COLOR: 'rgb(146 215 239)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {},
        body: {
          fontSize: '0.875rem',
          a: {
            textDecoration: 'none',
            color: 'inherit',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
      },
    },
  },
})

export default theme
