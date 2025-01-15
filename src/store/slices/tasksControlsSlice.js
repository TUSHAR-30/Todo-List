import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'taskControls',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    fetchTaskControls(state) {
      state.loading = true
    },
    fetchTaskControlsError(state, action) {
      state.loading = false
      state.error = action.payload || 'Something went wrong!'
    },
    updateTasksControls(state, action) {
      state.loading = false
      state.list = action.payload
      state.error = ''
    },
  },
})

// export const getAllProducts = (state) => state.products.list
// export const getProductLoadingState = (state) => state.products.loading
// export const getProductError = (state) => state.products.error

export const { updateTasksControls, fetchTaskControls, fetchTaskControlsError } = slice.actions
export default slice.reducer
