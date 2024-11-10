import styled from 'styled-components'

const FooterStyle = styled.div`

  .footer-company-detail,
  .footer-policy,
  .footer-partner {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .footer-company-detail,
    .footer-policy {
      grid-column: span 1;
      width: 100%;
    }

    .footer-partner {
      grid-column: span 2;
      width: 100%;
    }
  }
  @media (max-width: 576px) {
    .footer-content {
      display: flex;
      flex-direction: column;
    }
  }
`

export default FooterStyle
