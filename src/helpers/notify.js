import { Flip, toast } from 'react-toastify'

const notifySuccess = (message) => toast(message, { transition: Flip, type: 'success' })
const notifyError = (error) => toast.error(error, { transition: Flip, type: 'error' })

export { notifySuccess, notifyError }
