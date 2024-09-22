import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isFetching: false,
  },
  reducers: {
    isfetchingData: (state) => {
      state.isFetching = true
    },
    fetchingDataSuccess: (state) => {
      state.isFetching = false
    },
    login: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    setAccessTokenFromRefreshToken: (state, action) => {
      state.user.accessToken = action.payload
    },
    updateUser: (state, action) => {
      const { fullname, email, image } = action.payload
      state.user.fullname = fullname
      state.user.email = email
      state.user.image = image
    },
  },
})

export default authSlice
