/** @format */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from '~/utils/httpRequest'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
const cx = classNames.bind(styles)

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [emailErrorMessage, setEmailErrorMessage] = useState('')
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const handleOnchangeInfo = (e) => {
		const value = e.target.value
		const name = e.target.name
		if (name === 'password') {
			setPasswordErrorMessage('')
			setPassword(value)
		} else {
			setEmail(value)
			setEmailErrorMessage('')
		}
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const validateEmailRegex = /^\S+@\S+\.\S+$/

	const handleInvalidValue = () => {
		let check = true
		if (!validateEmailRegex.test(email)) {
			setEmailErrorMessage('Please enter the correct email format')
			check = false
		}
		if (!password) {
			setPasswordErrorMessage('Please enter the password')
			check = false
		}
		return check
	}
	const handleSubmit = async (e) => {
		setEmailErrorMessage('')
		setPasswordErrorMessage('')
		e.preventDefault()
		const check = handleInvalidValue()
		if (!check) {
			return
		}

		try {
			const userReq = await axios.post('/api/login', {
				email,
				password,
			})
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setErrorMessage(error.response.data.errMessage)
			}
		}
	}
	return (
		<div className={cx('wrapper')}>
			<form className={cx('login-form')}>
				<h4 className={cx('header-title')}>Log In</h4>
				<span className={cx('error-message')}>{errorMessage}</span>
				<div className={cx('form-control')}>
					<label htmlFor='email'>Email:</label>
					<div className={cx('input-form')}>
						<input
							type='text'
							name='email'
							id='email'
							placeholder='Enter your email'
							autoComplete='email'
							value={email}
							onChange={(e) => handleOnchangeInfo(e)}
						/>
					</div>
					<span className={cx('error-message')}>{emailErrorMessage}</span>
				</div>
				<div className={cx('form-control')}>
					<label htmlFor='password'>Password:</label>
					<div className={cx('input-form')}>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							id='password'
							placeholder='Enter your password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => {
								handleOnchangeInfo(e)
							}}
						/>

						<FontAwesomeIcon
							className={cx('icon-show-password')}
							icon={showPassword ? faEyeSlash : faEye}
							onClick={handleShowPassword}
						/>
					</div>
					<span className={cx('error-message')}>{passwordErrorMessage}</span>
				</div>
				<div className={cx('form-control')}>
					<button
						type='submit'
						className={cx('btn-login')}
						onClick={(e) => handleSubmit(e)}
					>
						Log In
					</button>
				</div>
				<a
					href='/login'
					className={cx('forgot-password')}
				>
					Forgot password?
				</a>
				<p className={cx('or-login')}>Or Sign In With:</p>
				<div className={cx('social-login')}>
					<div className={cx('logo', 'facebook-logo')}>
						<FontAwesomeIcon icon={faFacebookF} />
					</div>
					<div className={cx('logo', 'google-logo')}>
						<FontAwesomeIcon icon={faGoogle} />
					</div>
					<div className={cx('logo', 'twitter-logo')}>
						<FontAwesomeIcon icon={faTwitter} />
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login
