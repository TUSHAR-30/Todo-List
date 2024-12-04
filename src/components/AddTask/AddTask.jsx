import { SERVER_URL } from '../../../config';
import React, { useState } from 'react'
import Modal from '../../assets/Modal/ModalOverlay/Modal';
import AddTaskModalContent from '../../assets/Modal/AddTaskModalContent/AddTaskModalContent';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import "./AddTask.css"

function AddTask() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails,setTaskDetails]=useState({
    title:"",
    description:"",
    dueDate:"",
  })

  async function openModal() {

    try {
      const response = await axios.get(`${SERVER_URL}/auth/authenticate`,{
        withCredentials: true});
      setIsModalOpen(true)
    } catch (error) {
      navigate("/Todo-List/login")
      console.log(error);
      return;
    }
  }
  
  return (
    <div className='add-task'>
      <button onClick={openModal}><IoAddOutline size={22} />Add New Task</button>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
       <AddTaskModalContent setIsModalOpen={setIsModalOpen} taskDetails={taskDetails} setTaskDetails={setTaskDetails}/>
      </Modal>
    </div>
  )
}

export default AddTask  