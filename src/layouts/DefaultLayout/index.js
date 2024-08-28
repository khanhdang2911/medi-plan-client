/** @format */
import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { AuthContext } from '~/context/AuthContext'

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
	const { loading } = useContext(AuthContext)
	return (
		<div className={cx('wrapper')}>
			{loading ? (
				<Box sx={{ width: '100%' }}>
					<LinearProgress />
				</Box>
			) : (
				<>
					<Header />
					<div className={cx('content')}>{children}</div>
					<Footer />
				</>
			)}
		</div>
	)
}

export default DefaultLayout
