import styled from 'styled-components'
const MedicalFacilityStyle = styled.div`
  .facility-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1200px) {
    .facility-item {
      width: 300px;
    }

    .facility-title {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    .facility-item {
      width: 230px;
    }

    .facility-title {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .facility-item {
      width: 180px;
    }

    .facility-title {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 576px) {
    .facility-item {
      width: 150px;
    }
    .facility-title {
      font-size: 0.5rem;
    }
  }
`

export default MedicalFacilityStyle
