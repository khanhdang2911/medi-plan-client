import styled from 'styled-components'

const AccountContainer = styled.div`
  .profile-user-avatar {
    width: 150px;
    height: 150px;
  }
  @media (max-width: 992px) {
    .profile-user-avatar {
      width: 120px;
      height: 120px;
    }
    .btn-change-avatar {
      font-size: 12px;
    }
    .change-password-container {
      width: 100%;
    }
    .change-password-area {
      flex-direction: column;
      align-items: flex-start;
    }
    .change-password-input {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .account-containter {
      display: flex;
      flex-direction: column;
    }
    .account-menu {
      width: 100%;
      margin-bottom: 20px;
    }
    .account-infomation {
      width: 100%;
    }
    .profile-containter {
      flex-direction: column;
    }
    .profile-detail-infomation {
      width: 100%;
    }
  }
`

export default AccountContainer
