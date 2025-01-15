import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'refinedTasks',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    fetchRefinedTasks(state) {
      state.loading = true
    },
    fetchRefinedTasksError(state, action) {
      state.loading = false
      state.error = action.payload || 'Something went wrong!'
    },
    updateRefinedTasks(state, action) {
      state.loading = false
      state.list = action.payload
      state.error = ''
    },
  },
})

// export const getAllProducts = (state) => state.products.list
// export const getProductLoadingState = (state) => state.products.loading
// export const getProductError = (state) => state.products.error

export const { updateRefinedTasks, fetchRefinedTasks, fetchRefinedTasksError } = slice.actions
export default slice.reducer
