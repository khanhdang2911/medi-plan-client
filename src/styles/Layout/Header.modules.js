import styled from 'styled-components'

const HeaderStyle = styled.div`
  @media (max-width: 1200px) {
    .button-drawer {
      display: flex;
    }

    .menu-items {
      display: none;
    }
  }
  @media (max-width: 576px) {
    .service-link {
      display: none;
    }
  }
`

export default HeaderStyle
