import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import "./App.css"
import Notification from './assets/Notification/Notification'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'
import ProtectedRoute from './ProtectedRoute'
import { useContext, useEffect, useState } from 'react'
import TasksContext from './Context/TasksContext'
import Loader from './assets/Loader/Loader'

function App() {
  const {userProfile,loaderActive}=useContext(TasksContext);

   // Show loader until the profile/user fetch completes
   if (loaderActive) {
    return <Loader />;
  }

  return (
    <>
      <Notification />
      <Routes>
        <Route path='/Todo-List/' element={<HomePage />} />
        {!userProfile && <Route path='/Todo-List/login' element={<LoginPage />} />}
        {!userProfile && <Route path='/Todo-List/signup' element={<SignupPage />} />}

        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/Todo-List/login' element={<Navigate to="/Todo-List/" />} />
          <Route path='/Todo-List/signup' element={<Navigate to="/Todo-List/" />} />
          <Route path='/Todo-List/profile' element={<ProfilePage />} />
          <Route path='/Todo-List/updatePassword' element={<UpdatePasswordPage />} />
        </Route>

        <Route path='*' element={<Navigate to="/Todo-List/" />}/>

      </Routes>
    </>
  )
}

export default App


//still there is one problem which is encountering here is that if i go to profile page and updatePassword page from url , then i am not able to go even i am logged in. But i can go to these pages from user interface when user is logged in.


