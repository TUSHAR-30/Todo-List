import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import tasksReducer from './slices/tasksSlice'
import refinedTasksReducer from './slices/refinedTasksSlice'
import taskControlsReducer from './slices/tasksControlsSlice'


export const store = configureStore({
  reducer: {
    user:userReducer,
    tasks:tasksReducer,
    taskControls:taskControlsReducer,
    refinedTasks:refinedTasksReducer
  },
  // middleware:(getDefaultMiddleware) => [...getDefaultMiddleware()]
})
