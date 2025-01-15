import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
  name: 'user/me',
  initialState: {
    loading: false,
    userProfile: null,
    error: '',
  },
  reducers: {
    handleUser(state) {
      state.loading = true
    },
    handleUserError(state, action) {
      state.loading = false
      state.error = action.payload || 'Something went wrong!'
    },
    updateUser(state, action) {
      state.loading = false
      state.userProfile = action.payload
      state.error = ''
    },
  },
})


const { updateUser, handleUser, handleUserError } = slice.actions

export const fetchUserData = () => async(dispatch) => {
  dispatch(handleUser())
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/user/me`, {
      withCredentials: true
    })
    const data = response.data;
    dispatch(updateUser(data.user))
  } catch (err) {
    console.dir(err)
    dispatch(handleUserError(err.response.data.message))
  }
}

export const handleLogout = () => async(dispatch) => {
  dispatch(handleUser())
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/auth/logout`, {
      withCredentials: true
    })
    dispatch(updateUser(null))
  } catch (err) {
    console.dir(err)
    dispatch(handleUserError(err.response.data.message))
  }
}


export default slice.reducer
