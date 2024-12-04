import { SERVER_URL } from '../../../../config'
import React, { useContext } from 'react'
import "./DeleteTaskModalContent.css"
import TasksContext from '../../../Context/TasksContext'
import useNotification from '../../../Hooks/useNotification'
import axios from 'axios'

function DeleteTaskModalContent({ openedTask, setIsModalOpen , handleDeleteAnimation }) {
    const [notifications,closeNotification,addNotification]=useNotification()
    const { setTasks } = useContext(TasksContext)
    async function deleteTask(userChoice) {
        if (userChoice){
            try{
                const response = await axios.delete(`${SERVER_URL}/tasks/${openedTask._id}`, {
                    withCredentials: true
                });
                handleDeleteAnimation();
                setTimeout(() => {
                    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== openedTask._id));
                    addNotification("delete","Task Deleted Successfully")
                }, 800)  //200ms more than animation in order for better visibility.
            }
            catch(err){
                console.log(err)
            }
           
        }

        setIsModalOpen(false)
    }

    return (
        <>
            <div className='deleteQuestion'>Are you sure that you want to delete this task?</div>
            <div className='deleteOptions'>
                <button onClick={() => deleteTask(true)}>Yes</button>
                <button onClick={() => deleteTask(false)}>No</button>
            </div>
        </>

    )
}

export default DeleteTaskModalContent