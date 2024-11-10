import styled from 'styled-components'
export const HandbookStyle = styled.div``

const HandbookItemStyle = styled.div`
  .handbook-item {
    height: 270px;
    width: 270px;
  }
  .handbook-item-image {
    height: 140px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    .handbook-item {
      height: 250px;
      width: 250px;
    }
    .handbook-item-image {
      height: 130px;
      width: 100%;
    }
    .handbook-item-title {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .handbook-item {
      height: 200px;
      width: 200px;
    }
    .handbook-item-image {
      height: 110px;
      width: 100%;
    }
    .handbook-item-title {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }

  @media (max-width: 480px) {
    .handbook-item {
      height: 160px;
      width: 160px;
    }
    .handbook-item-image {
      height: 90px;
      width: 100%;
    }
    .handbook-item-title {
      font-size: 0.6rem;
      font-weight: 400;
    }
  }
`

export default HandbookItemStyle
