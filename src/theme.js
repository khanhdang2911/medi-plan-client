/** @format */

import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					fontSize: '62.5%',
				},
				body: {
					fontSize: '1.6rem',
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
