import axios from '../../utils/httpRequest'
const getTopDoctorHome = async (limit) => {
  let response = await axios.get(`doctors/get-top-doctor-home?limit=${limit}`)
  return response
}

export { getTopDoctorHome }
