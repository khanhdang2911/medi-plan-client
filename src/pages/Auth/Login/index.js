/** @format */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import InputField from '~/components/InputField'
import useForm from '~/hooks/useForm'
import { loginUser } from '~/utils/api/auth.api'
import authSlice from '~/redux/authSlice'
import { store } from '~/redux/stote'
const cx = classNames.bind(styles)

function Login() {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const { values, errors, handleOnChangeInfo, validate } = useForm({
		email: '',
		password: '',
	})

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!validate()) {
			return
		}

		try {
			store.dispatch(authSlice.actions.isfetchingData())
			const response = await loginUser({
				email: values.email,
				password: values.password,
			})
			const data = response.data
			if (data.user) {
				store.dispatch(authSlice.actions.login(data.user))
				navigate('/')
			}
			else {
				setErrorMessage(data.message)
			}
			store.dispatch(authSlice.actions.fetchingDataSuccess())
		} catch (error) {
			setErrorMessage('Error when login from server!')
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
					value={values.email}
					onChange={(e) => handleOnChangeInfo(e)}
					errors={errors}
				/>

				<InputField
					labelName='Password'
					type={showPassword ? 'text' : 'password'}
					name='password'
					id='password'
					placeholder='Enter your password'
					autoComplete='current-password'
					value={values.password}
					onChange={(e) => {
						handleOnChangeInfo(e)
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
