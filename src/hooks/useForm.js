import { useState } from 'react'

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState({})

  const handleOnChangeInfo = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    let valid = true
    let newErrors = {}
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = 'Please enter the correct email format'
      valid = false
    }
    Object.keys(values).forEach((value) => {
      if (!values[value]) {
        newErrors = { ...newErrors, [value]: `Please enter your ${value} ` }
      }
    })

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Re-enter the password incorrectly'
    }

    setErrors(newErrors)
    return valid
  }

  return {
    values,
    errors,
    handleOnChangeInfo,
    validate,
  }
}

export default useForm
