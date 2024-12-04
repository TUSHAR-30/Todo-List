import React, { useContext } from 'react'
import TasksContext from './Context/TasksContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const {userProfile}=useContext(TasksContext);
    return userProfile?<Outlet />:<Navigate to="Todo-List/login" />
}

export default ProtectedRoute