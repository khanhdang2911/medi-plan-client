import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from '../Login/Login.module.scss'
import InputField from '~/components/InputField'
import useForm from '~/hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '~/utils/api/auth.api'
const cx = classNames.bind(styles)

function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [gender, setGender] = useState('')
  const [genderError, setGenderError] = useState('')
  const { values, errors, handleOnChangeInfo, validate } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    phonenumber: '',
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChangeGender = (e) => {
    setGenderError('')
    setGender(e.target.name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    if (!gender) {
      setGenderError('Please choose your gender')
      return
    }
    try {
      const dataFromResponse = await registerUser({
        email: values.email,
        password: values.password,
        fullname: values.fullname,
        address: values.address,
        phonenumber: values.phonenumber,
        gender: gender === 'male' ? '1' : '0',
      })
      if (dataFromResponse.data?.errMessage && dataFromResponse.data?.errCode !== 0) {
        setErrorMessage(dataFromResponse.data.errMessage)
      } else {
        navigate('/login')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.errMessage)
      }
    }
  }
  return (
    <div className={cx('wrapper')}>
      <form className={cx('login-form')}>
        <h4 className={cx('header-title')}>Register</h4>
        <span className={cx('error-message')}>{errorMessage}</span>
        <InputField
          labelName="Email"
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => handleOnChangeInfo(e)}
          errors={errors}
        />

        <InputField
          labelName="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
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

        <InputField
          labelName="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          autoComplete="current-confirm-password"
          value={values.confirmPassword}
          onChange={(e) => {
            handleOnChangeInfo(e)
          }}
          errors={errors}
        >
          <FontAwesomeIcon
            className={cx('icon-show-password')}
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={handleShowConfirmPassword}
          />
        </InputField>
        <InputField
          labelName="Fullname"
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Fullname"
          autoComplete="fullname"
          value={values.fullname}
          onChange={(e) => handleOnChangeInfo(e)}
          errors={errors}
        />
        <InputField
          labelName="Phone number"
          type="text"
          name="phonenumber"
          id="phonenumber"
          placeholder="Enter your phone number"
          autoComplete="phonenumber"
          value={values.phonenumber}
          onChange={(e) => handleOnChangeInfo(e)}
          errors={errors}
        />
        <div className={cx('radio-box')}>
          <p className={cx('radio-box-title')}>
            <b>Gender:</b>
          </p>
          <div className={cx('radio-box-control')}>
            <input
              type="radio"
              id="male"
              name="male"
              value="1"
              onChange={(e) => handleChangeGender(e)}
              checked={gender === 'male'}
              className={cx('radio-box-input')}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className={cx('radio-box-control')}>
            <input
              type="radio"
              id="female"
              name="female"
              onChange={(e) => handleChangeGender(e)}
              checked={gender === 'female'}
              value="0"
              className={cx('radio-box-input')}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <span className={cx('error-message')}>{genderError}</span>
        <div className={cx('form-control')}>
          <button type="submit" className={cx('btn-login')} onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
