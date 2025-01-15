import { SERVER_URL } from '../../../config';
import React, { forwardRef, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./ProfileContainerModal.css";
import axios from 'axios';
import TasksContext from '../../Context/TasksContext';
import useNotification from '../../Hooks/useNotification';
import Loader from '../Loader/Loader';

const ProfileContainerModal = forwardRef((props, ref) => {
    const [loaderActive,setLoaderActive]=useState(false);
    const navigate = useNavigate();
    const { userProfile,setUserProfile,setTasks } = useContext(TasksContext);
    const [notifications, closeNotification, addNotification] = useNotification()

    async function handleLogout(){
        setLoaderActive(true)
        try{
            await axios.get(`${SERVER_URL}/auth/logout`, {
                withCredentials: true
            });
            setLoaderActive(false);
            setUserProfile(null);
            setTasks([])
            addNotification("logout", " User Logout Successfully")
        }
        catch(err){
            setLoaderActive(false);
            console.log(err)
        }
    }

    if(loaderActive){
        return <Loader />
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
