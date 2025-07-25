import axios from '../../utils/httpRequest'
const getTopDoctorHome = async (limit) => {
  let response = await axios.get(`doctors/get-top-doctor-home?limit=${limit}`)
  return response
}

const getDoctorById = async (id) => {
  let response = await axios.get(`doctors/get-doctor-by-id?id=${id}`)
  return response
}
const getAllDoctors = async () => {
  let response = await axios.get('doctors/get-all-doctor')
  return response
}

const createDetailInfoDoctor = async (data) => {
  let response = await axios.post('doctors/create-detail-info-doctor', data)
  return response
}

const getAllTimeSpace = async () => {
  let response = await axios.get('doctors/get-all-time-space')
  return response
}

const createScheduleForDoctor = async (data) => {
  let response = await axios.post('doctors/create-schedule-for-doctor', data)
  return response
}

const getScheduleDoctorByDate = async (date, doctorId) => {
  let response = await axios.get(`doctors/get-schedule-doctor-by-date?date=${date}&&doctorId=${doctorId}`)
  return response
}
export {
  getTopDoctorHome,
  getDoctorById,
  getAllDoctors,
  createDetailInfoDoctor,
  getAllTimeSpace,
  createScheduleForDoctor,
  getScheduleDoctorByDate,
}
