import { SERVER_URL } from '../../../config';
import React, { forwardRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./ProfileContainerModal.css";
import axios from 'axios';
import TasksContext from '../../Context/TasksContext';
import useNotification from '../../Hooks/useNotification';

const ProfileContainerModal = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const { userProfile,setUserProfile,setTasks } = useContext(TasksContext);
    const [notifications, closeNotification, addNotification] = useNotification()


    async function handleLogout(){
        try{
            await axios.get(`${SERVER_URL}/auth/logout`, {
                withCredentials: true
            });
            setUserProfile(null);
            setTasks([])
            addNotification("logout", " User Logout Successfully")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        userProfile ? (
            <div className="profile-container-modal" ref={ref}>
                <button className='authenticaton-options' onClick={() => navigate("/Todo-List/profile")}>Profile</button>
                <button className='authenticaton-options' onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div className="profile-container-modal" ref={ref}>
                <button className='authenticaton-options' onClick={() => navigate("/Todo-List/login")}>Login</button>
                <button className='authenticaton-options' onClick={() => navigate("/Todo-List/signup")}>Signup</button>
            </div >
        )

    );
});

export default ProfileContainerModal;
