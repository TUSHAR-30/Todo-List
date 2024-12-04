import React from 'react'

function ViewTaskModalContent({ openedTask, setIsModalOpen }) {
    function handleCancelFormSubmit() {
        setIsModalOpen(false)
    }
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Your Task</h2>
            <form className='taskdetailsform' >
                <div className='taskdetails'>
                    <label htmlFor="">Task Title</label>
                    <input
                        type="text"
                        name="title"
                        disabled
                        value={openedTask.title}
                    />
                </div>
                <div className='taskdetails'>
                    <label htmlFor="">Task Description(Optional)</label>
                    <textarea
                        rows={10}
                        style={{ resize: 'none' }}
                        name="description"
                        disabled
                        value={openedTask.description}
                    />
                </div>
                <div className='taskdetails'>
                    <label htmlFor="">Task Creation Date</label>
                    <input
                        type="date"
                        disabled
                        value={openedTask.taskCreationDate}
                    />
                </div>
                <div className='taskdetails'>
                    <label htmlFor="">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        disabled
                        value={openedTask.dueDate}
                    />
                </div>
                <div className='actionbuttons'>
                    <button type="button" onClick={handleCancelFormSubmit}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default ViewTaskModalContent