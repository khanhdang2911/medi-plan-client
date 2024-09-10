/** @format */

import { Box, IconButton, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined'
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined'
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined'
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import MoodBadIcon from '@mui/icons-material/MoodBad'

const ALL_SERVICES = [
	{
		text: 'Khám chuyên khoa',
		icon: <MedicationLiquidOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
	{
		text: 'Khám từ xa',
		icon: <ContactPhoneOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
	{
		text: 'Khám tổng quát',
		icon: <EventNoteOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
	{
		text: 'Xét nghiệm y học',
		icon: <BloodtypeOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
	{
		text: 'Sức khỏe tinh thần',
		icon: <PsychologyAltOutlinedIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
	{
		text: 'Khám nha khoa',
		icon: <MoodBadIcon sx={{ width: '20px', height: '20px', color: 'rgb(146 215 239)' }} />,
	},
]
const BannerHome = () => {
	return (
		<Box sx={{ height: '300px', bgcolor: 'rgb(146 215 239)' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '20px' }}>
				<Typography sx={{ fontWeight: '500', fontSize: '2.5rem' }}>Nơi khởi nguồn của sức khỏe</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '15px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', width: '90%', bgcolor: 'white', borderRadius: '20px' }}>
					<TextField
						placeholder='Đặt câu hỏi với trợ lí AI'
						sx={{
							width: '100%',
							outline: 'none',
							'& fieldset': {
								display: 'none',
							},
							'.MuiOutlinedInput-input': {
								fontSize: '1.5rem !important',
								fontWeight: '500 !important',
							},
						}}
					></TextField>
					<IconButton
						children={<SendIcon />}
						sx={{
							'&:hover': {
								bgcolor: 'transparent',
							},
						}}
					/>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
					{ALL_SERVICES.map((service, index) => {
						return (
							<Box
								key={index}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '5px',
									bgcolor: 'white',
									padding: '10px',
									border: '1px solid grey',
									borderRadius: '12px',
									minWidth: '40px',
								}}
							>
								{service.icon}
								<Typography sx={{ fontSize: '0.8rem', color: 'black', fontWeight: '600', opacity: '0.8' }}>{service.text}</Typography>
							</Box>
						)
					})}
				</Box>
			</Box>
		</Box>
	)
}
export default BannerHome
