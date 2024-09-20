/** @format */

import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import images from '~/assets'

var items = [
	{
		image: images.bacsicoxuongkhoptuxa,
		name: 'Bệnh viện hữu nghị Việt Đức',
	},
	{
		image: images.bacsidalieutuxa,
		name: 'Bệnh viện chợ Rẫy',
	},
	{
		image: images.bacsinoikhoatuxa,
		name: 'Doctor Check',
	},
	{
		image: images.bacsitieuhoatuxa,
		name: 'Phòng khám đại học Y Dược 1',
	},
	{
		image: images.suckhoetinhthantuxa,
		name: 'Trung tâm y tế quận 1',
	},
	{
		image: images.tamlituxa,
		name: 'Bênh viện ung bướu',
	},
]
function MedicalFacility() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
			<Box sx={{ width: (theme) => theme.booking_care.WIDTH_COMMON }}>
				<Typography
					variant='h5'
					sx={{ fontWeight: '600', opacity: '0.9', mb: '30px' }}
				>
					Cơ sở y tế
				</Typography>
				<Carousel
					animation='slide'
					autoPlay={false}
					duration={1000}
					indicators={false}
				>
					{items.slice(0, 2).map((item, i) => (
						<ManyItem
							key={i}
							manyItems={items.slice(i * 3, i * 3 + 3)}
						/>
					))}
				</Carousel>
			</Box>
		</Box>
	)
}
function ManyItem(props) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			{props.manyItems.map((item, i) => {
				return (
					<Box
						key={i}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '5px',
							border: '1px solid #c8d6e5',
							borderRadius: '10px',
							width: '341px',
						}}
					>
						<img
							src='https://cdn.bookingcare.vn/fo/w384/2018/06/18/083122lo-go-viet-duc.jpg'
							alt='cosoyte'
							width='329'
							height='157'
							style={{ objectFit: 'cover' }}
						/>
						<Typography sx={{ fontSize: '1.2rem', fontWeight: '600', mt: 2 }}>{item.name}</Typography>
					</Box>
				)
			})}
		</Box>
	)
}
export default MedicalFacility
