/** @format */

import styles from '~/pages/Auth/Login/Login.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function InputField({ labelName, type, name, id, placeholder, autoComplete, value, onChange, errors, children }) {
	return (
		<div className={cx('form-control')}>
			<label htmlFor={name}>{labelName}</label>
			<div className={cx('input-form')}>
				<input
					type={type}
					name={name}
					id={id}
					placeholder={placeholder}
					autoComplete={autoComplete}
					value={value}
					onChange={onChange}
				/>
				{children ? children : <></>}
			</div>
			<span className={cx('error-message')}>{errors[name]}</span>
		</div>
	)
}

export default InputField
