import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const findItemIndex = (state, action) =>
  state.findIndex((task) => task._id === action.payload._id)

const slice = createSlice({
  name: 'tasks',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    handleTasks(state) {
      state.loading = true
    },
    handleTasksError(state, action) {
      state.loading = false
      state.error = action.payload || 'Something went wrong!'
    },
    updateAllTasks(state, action) {
      state.loading = false
      state.list = action.payload
      state.error = ''
    },
    addTask(state,action){
      state.loading = false
      state.list.push(action.payload)
      state.error = ''
    },
    deleteTask(state,action){
      state.loading = false
      state.list.splice(action.payload,1)
      state.error = ''
    },
    editTask(state,action){
      state.loading = false;
      const existingItemIndex = findItemIndex(state.list, action)
      state.list[existingItemIndex]=action.payload
      state.error = ''
    }
  }
})

const { updateAllTasks, handleTasks, handleTasksError , addTask , deleteTask , editTask } = slice.actions

export const fetchUserTasks = () => async(dispatch) => {
  dispatch(handleTasks())
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/tasks`, {
      withCredentials: true
    })
    const data = response.data;
    dispatch(updateAllTasks(data.data.tasks))
  } catch (err) {
    console.dir(err)
    dispatch(handleTasksError(err.response.data.message))
  }
}

export const handleAddTask = () => async(dispatch) => {
  dispatch(handleTasks())
  try {
    const task={
      title:"Redux toolkit",
      description:"This is a dummy testing",
      isCompleted:false,
      taskCreationDate: new Date().toISOString().split('T')[0],
      dueDate:"2027-01-24"
    }
    const response = await axios.post(`http://localhost:8000/api/v1/tasks`,{...task},{
      withCredentials: true
    })
    const data = response.data;
    dispatch(addTask(data.data.task))
  } catch (err) {
    console.dir(err)
    dispatch(handleTasksError(err.response.data.message))
  }
}

export const handleDeleteTask = () => async(dispatch) => {
  dispatch(handleTasks())
  try {
    const taskId="6787d6b9a76fdd3e9f450447";
    const response = await axios.delete(`http://localhost:8000/api/v1/tasks/${taskId}`,{
      withCredentials: true
    })
    dispatch(deleteTask(taskId))
  } catch (err) {
    console.dir(err)
    dispatch(handleTasksError(err.response.data.message))
  }
}

export const handleEditTask = () => async(dispatch) => {
  dispatch(handleTasks())
  try {
    const taskId="6787d750a76fdd3e9f450473";
    const task={
      title:"Kya hal hai didi ke",
      description:"This is a dummy testing",
      dueDate:"2027-01-24"
    }
    const response = await axios.patch(`http://localhost:8000/api/v1/tasks/${taskId}`,task,{
      withCredentials: true
    })
    const data = response.data;
    dispatch(editTask(data.data.task))
  } catch (err) {
    console.dir(err)
    dispatch(handleTasksError(err.response.data.message))
  }
}

export const handleToggleTaskCompletion = () => async(dispatch) => {
  dispatch(handleTasks())
  try {
    const taskId="6787d750a76fdd3e9f450473";
    const task={
      title:"Kya hal hai didi ke",
      description:"This is a dummy testing",
      dueDate:"2027-01-24"
    }
    const response = await axios.patch(`http://localhost:8000/api/v1/tasks/${taskId}`,{isCompleted:!task.isCompleted},{
      withCredentials: true
    })
    const data = response.data;
    dispatch(editTask(data.data.task))
  } catch (err) {
    console.dir(err)
    dispatch(handleTasksError(err.response.data.message))
  }
}




export default slice.reducer
