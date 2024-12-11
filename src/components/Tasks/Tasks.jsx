import React, { useContext, useState, useEffect } from 'react';
import Task from './Task';
import './Tasks.css';
import TasksContext from '../../Context/TasksContext';
import { filterTasksByDateRange, sortedTasks_Alphabatically_Ascending, sortedTasks_CreationDate_Descending } from '../../utils';


function Tasks() {
    const { tasks , selectedFilter , filterStartDate , filterEndDate , selectedSort } = useContext(TasksContext);
    const [tasksToBeShown, setTasksToBeShown] = useState(tasks);
    const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);

    useEffect(() => {
        let temp=[...tasks]
        temp=filterTasksByDateRange(temp,filterStartDate,filterEndDate);
        let tempBooleanTaskCompleted = selectedFilter === "Completed" ? true : false;
        temp=selectedFilter == "All Tasks"?temp:(temp.filter((task) => task.isCompleted == tempBooleanTaskCompleted))

        if(selectedSort){
            temp=selectedSort=="Sort by Alphabatically"
            ?sortedTasks_Alphabatically_Ascending(temp)
            :sortedTasks_CreationDate_Descending(temp)
        }
        setTasksToBeShown(temp)
        
    }, [selectedFilter, tasks ,filterStartDate , filterEndDate ,selectedSort])


    return (
        <div className='tasks'>
            {tasks.length !== 0 ? (
                tasksToBeShown.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        draggedTaskIndex={draggedTaskIndex}
                        setDraggedTaskIndex={setDraggedTaskIndex}
                        isDraggable={true}
                    />
                ))
            ) : (
                <>
                    <div className='notasks-animation-container'>
                        <dotlottie-player style={{height:"145px",display:"block"}} src="animation.json" speed="1"  autoplay></dotlottie-player>
                        <div className='taskadding-request'><span className='openhands-emoji'>🤗</span> Add some tasks.</div>
                    </div>
                    <h3 style={{ textAlign: 'center' }}>No Tasks are present</h3>
                </>
            )}
        </div>
    );
}

export default Tasks;