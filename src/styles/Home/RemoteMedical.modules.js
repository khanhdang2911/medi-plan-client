import styled from 'styled-components'
const RemoteMedicalStyle = styled.div`
  .remote-medical-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    .remote-medical-item {
      width: 300px;
    }
  }

  @media (max-width: 992px) {
    .remote-medical-item {
      width: 230px;
    }
    .remote-medical-title {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .remote-medical-item {
      width: 180px;
    }
    .remote-medical-title {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 576px) {
    .remote-medical-item {
      width: 150px;
    }
    .remote-medical-title {
      font-size: 0.5rem;
    }
  }
`

export default RemoteMedicalStyle
