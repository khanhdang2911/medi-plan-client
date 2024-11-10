import styled from 'styled-components'

const DoctorDetailContainer = styled.div`
  @media (max-width: 768px) {
    .doctor-schedule-container {
      flex-direction: column;
    }
    .doctor-schedule-detail,
    .doctor-hospital-info {
      width: 100%;
    }
  }
`

export default DoctorDetailContainer
