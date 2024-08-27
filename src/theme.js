/** @format */

import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
	booking_care: {
		HEADER_HEIGHT: '78px',
		WIDTH_COMMON: '1208px',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: {},
				body: {
					fontSize: '0.875rem',
					a: {
						textDecoration: 'none',
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
