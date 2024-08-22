/** @format */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from '~/utils/httpRequest'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import InputField from '~/components/InputField'
const cx = classNames.bind(styles)

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [errors, setErrors] = useState({})
	const [errorMessage, setErrorMessage] = useState('')
	const handleOnchangeInfo = (e) => {
		const { name, value } = e.target
		setErrors((prev) => ({ ...prev, [name]: '' }))
		setErrorMessage('')
		if (name === 'email') {
			setEmail(value)
		} else if (name === 'password') {
			setPassword(value)
		}
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const validate = () => {
		const errors = {}
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			errors.email = 'Please enter the correct email format'
		}
		if (!password) {
			errors.password = 'Please enter the password'
		}
		return errors
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const errors = validate()
		if (Object.keys(errors).length > 0) {
			setErrors(errors)
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
				<InputField
					labelName='Email'
					type='text'
					name='email'
					id='email'
					placeholder='Enter your email'
					autoComplete='email'
					value={email}
					onChange={(e) => handleOnchangeInfo(e)}
					errors={errors}
				/>

				<InputField
					labelName='Password'
					type={showPassword ? 'text' : 'password'}
					name='password'
					id='password'
					placeholder='Enter your password'
					autoComplete='current-password'
					value={password}
					onChange={(e) => {
						handleOnchangeInfo(e)
					}}
					errors={errors}
				>
					<FontAwesomeIcon
						className={cx('icon-show-password')}
						icon={showPassword ? faEyeSlash : faEye}
						onClick={handleShowPassword}
					/>
				</InputField>
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
