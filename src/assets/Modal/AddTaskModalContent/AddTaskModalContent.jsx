import React, { useEffect, useState, useContext, useRef } from 'react'
import { IoMicCircleSharp } from "react-icons/io5";
import TasksContext from '../../../Context/TasksContext';
import useNotification from '../../../Hooks/useNotification';
import { Task } from "../../../Classes/TaskClass"
import useSpeechToText from '../../../Hooks/useSpeechToText';
import useInputFocus from '../../../Hooks/useInputFocus';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';

function AddTaskModalContent({ taskDetails, setTaskDetails, setIsModalOpen }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [notifications, closeNotification, addNotification] = useNotification()
  const { titleInputRef, descriptionInputRef, dueDateInputRef, handleKeyDown } = useInputFocus()
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true })

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening()
  }

  const stopVoiceInput = () => {
    stopListening()
    setTaskDetails(prev => {
      let res = prev.title + (transcript.length ? (prev.length ? ' ' : '') + transcript : '')
      return (
        {
          ...prev,
          title: res
        }
      )
    })

  }

  // Get today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  function handleFormDetails(e) {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => {
      return (
        {
          ...prevDetails,
          [name]: value
        }
      )
    })
  }
  async function handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    const newTask = new Task(taskDetails.title, taskDetails.description, false, today, taskDetails.dueDate);

    try {
      const response = await axios.post(`${SERVER_URL}/tasks/`,{...newTask},{
        withCredentials: true
      });
      const createdTask=response.data.data.task;

      setTasks([...tasks,createdTask])
      addNotification("add", "Task Added Successfully")
      setTaskDetails({ title: "", description: "", dueDate: "" });
      setIsModalOpen(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  function handleCancelFormSubmit(e) {
    setIsModalOpen(false)
  }
  function validateForm() {
    if (taskDetails.title.trim() && taskDetails.dueDate >= today) setIsSaveButtonEnabled(true)
    else setIsSaveButtonEnabled(false)
  }

  useEffect(() => {
    validateForm();
  }, [taskDetails])

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Create Your Task</h2>
      <form className='taskdetailsform' onSubmit={handleFormSubmit}>
        <div className='taskdetails'>
          <div>Enter Task Title</div>
          <div className='field'>
            <input
              ref={titleInputRef}
              type="text"
              name="title"
              value={isListening ? taskDetails.title + (transcript.length ? (taskDetails.title.length ? ' ' : '') + transcript : '') : taskDetails.title}
              disabled={isListening}
              onChange={handleFormDetails}
              onKeyDown={handleKeyDown}
            />
            {/* <div className={`mic ${isListening ? "mic-listening" : ""}`}>
              <IoMicCircleSharp
                onClick={() => startStopListening()}
              />
            </div> */}
          </div>
        </div>
        <div className='taskdetails'>
          <div>Enter Task Description(Optional)</div>
          <textarea
            ref={descriptionInputRef}
            rows={10}
            style={{ resize: 'none' }}
            name="description"
            value={taskDetails.description}
            onChange={handleFormDetails}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='taskdetails'>
          <div>Select Due Date</div>
          <input
            ref={dueDateInputRef}
            type="date"
            name="dueDate"
            min={today}
            max="9999-12-31"
            value={taskDetails.dueDate}
            onChange={handleFormDetails}
          />
        </div>
        <div className='actionbuttons'>
          <button type="button" onClick={handleCancelFormSubmit}>Cancel</button>
          <button type="submit" name='save-btn' disabled={!isSaveButtonEnabled} className={`${isSaveButtonEnabled ? "" : "savebtn-not-allowed"}`} >Save</button>
        </div>
      </form>
    </>
  )
}

export default AddTaskModalContent