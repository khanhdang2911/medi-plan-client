/** @format */
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
const cx = classNames.bind(styles)

function Login() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('login-form')}>
				<h4 className={cx('header-title')}>Log In</h4>
				<div className={cx('form-control')}>
					<label for='email'>Email:</label>
					<div className={cx('input-form')}>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email'
						/>
					</div>
				</div>
				<div className={cx('form-control')}>
					<label for='password'>Password:</label>
					<div className={cx('input-form')}>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
						/>
					</div>
				</div>
				<div className={cx('form-control')}>
					<button
						type='submit'
						className={cx('btn-login')}
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
        <p className={cx("or-login")}>Or Sign In With:</p>
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
			</div>
		</div>
	)
}

export default Login
