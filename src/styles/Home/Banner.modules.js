import styled from 'styled-components'

const BannerStyle = styled.div`
  .service-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    .search-box {
      padding: 15px 0;
    }
    .service-item {
      padding: 5px;
    }
    .service-icon {
      font-size: 1rem;
    }
    .service-text {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 992px) {
    .banner-title {
      font-size: 2.2rem;
    }
    .service-item {
      padding: 5px;
    }
    .service-icon {
      font-size: 1rem;
    }
    .service-text {
      font-size: 0.6rem;
    }
  }
  @media (max-width: 768px) {
    .banner-title {
      font-size: 1.6rem;
      font-weight: 500;
    }

    .service-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-content: center;
    }
    .service-item {
      width: 130px;
    }
  }
`

export default BannerStyle
