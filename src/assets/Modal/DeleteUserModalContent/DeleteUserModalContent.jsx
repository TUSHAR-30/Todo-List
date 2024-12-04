import { SERVER_URL } from '../../../../config';
import React, { useContext } from 'react'
import useNotification from '../../../Hooks/useNotification'
import axios from 'axios'
import "./DeleteUserModalContent.css"
import { useNavigate } from 'react-router-dom';
import TasksContext from '../../../Context/TasksContext';

function DeleteUserModalContent({ setIsModalOpen }) {
    const navigate = useNavigate();
    const { setUserProfile ,setTasks } = useContext(TasksContext);
    const [notifications, closeNotification, addNotification] = useNotification()
    async function deleteProfile(userChoice) {
        if (userChoice) {
            try {
                const response = await axios.delete(`${SERVER_URL}/user/deleteMe`, {
                    withCredentials: true
                });
                setUserProfile(null);
                setTasks([])
                setIsModalOpen(false)
                navigate('/Todo-List/')
                addNotification("delete", "Account Deleted Successfully")
            }
            catch (err) {
                console.log(err)
            }

        }
        else {
            setIsModalOpen(false)
        }
    }

    return (
        <>
            <div className='deleteQuestion'>Are you sure that you want to delete your profile?</div>
            <div className='deleteOptions'>
                <button onClick={() => deleteProfile(true)}>Yes</button>
                <button onClick={() => deleteProfile(false)}>No</button>
            </div>
        </>

    )
}

export default DeleteUserModalContent