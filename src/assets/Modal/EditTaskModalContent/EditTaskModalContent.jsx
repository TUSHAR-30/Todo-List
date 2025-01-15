import { SERVER_URL } from '../../../../config';
import React, { useEffect, useState, useContext, useRef } from 'react'
import TasksContext from '../../../Context/TasksContext';
import useNotification from '../../../Hooks/useNotification';
import useInputFocus from '../../../Hooks/useInputFocus';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import { flushSync } from 'react-dom';

function EditTaskModalContent({ openedTask, setOpenedTask, setIsModalOpen }) {
    const [loaderActive,setLoaderActive]=useState(false);
    const { tasks, setTasks } = useContext(TasksContext);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(true);
    const [notifications, closeNotification, addNotification] = useNotification()
    const { titleInputRef, descriptionInputRef, dueDateInputRef, handleKeyDown } = useInputFocus()

    // // Get today’s date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const temptoday = new Date();
    const formattedDate = `${String(temptoday.getMonth() + 1).padStart(2, '0')}-${String(temptoday.getDate()).padStart(2, '0')}-${temptoday.getFullYear()}`;

    function handleFormDetails(e) {
        const { name, value } = e.target;
        setOpenedTask((prevDetails) => {
            return (
                {
                    ...prevDetails,
                    [name]: value
                }
            )
        })
    }

    async function handleFormSubmit(e) {
        // flushSync(()=>{
        // })
        setLoaderActive(true)
        setIsModalOpen(false)

        try {
        e.preventDefault(); // Prevent default form submission
            const updatedTask = await axios.patch(`${SERVER_URL}/tasks/${openedTask._id}`, {
                title: openedTask.title,
                description: openedTask.description,
                dueDate: openedTask.dueDate
            }, {
                withCredentials: true
            });
            setTasks(tasks.map((task) =>
                task._id == openedTask._id ? updatedTask.data.data.task : task
            ));
            
            addNotification("edit", "Task Updated Successfully")
            setOpenedTask({ title: "", description: "", dueDate: "" });
        } catch (err) {
            setLoaderActive(false)
            console.log(err);
        }
    }

    function handleCancelFormSubmit() {
        setIsModalOpen(false)
    }
    function validateForm() {
        if (openedTask.title.trim() && openedTask.dueDate >= today) setIsSaveButtonEnabled(true)
        else setIsSaveButtonEnabled(false)
    }

    useEffect(() => {
        validateForm();
    }, [openedTask])

    if(loaderActive){
        return <Loader />
    }

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Edit Your Task</h2>
            <form className='taskdetailsform' onSubmit={handleFormSubmit}>
                <div className='taskdetails'>
                    <div>Enter Task Title</div>
                    <input
                        ref={titleInputRef}
                        type="text"
                        name="title"
                        value={openedTask.title}
                        onChange={handleFormDetails}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='taskdetails'>
                    <div>Enter Task Description(Optional)</div>
                    <textarea
                        ref={descriptionInputRef}
                        rows={10}
                        style={{ resize: 'none' }}
                        name="description"
                        value={openedTask.description}
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
                        value={openedTask.dueDate}
                        onChange={handleFormDetails}
                    />
                    <p className='date-error'>{openedTask.dueDate < today && `Value must be ${formattedDate} or later`}</p>
                </div>
                <div className='actionbuttons'>
                    <button type="button" onClick={handleCancelFormSubmit}>Cancel</button>
                    <button type="submit" name='save-btn' disabled={!isSaveButtonEnabled} className={`${isSaveButtonEnabled ? "" : "savebtn-not-allowed"}`} >Save</button>
                </div>
            </form>
        </>
    )
}

export default EditTaskModalContent