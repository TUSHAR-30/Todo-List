import { SERVER_URL } from '../../config';
import React, { createContext, useEffect, useState } from 'react';
import { Task } from '../Classes/TaskClass';
import axios from 'axios';


// Create the context
const TasksContext = createContext();

// Create the provider component
export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("All Tasks");
    const [filterStartDate, setFilterStartDate] = useState("")
    const [filterEndDate, setFilterEndDate] = useState("")
    const [selectedSort, setSelectedSort] = useState("")
    const [dateRange, setDateRange] = useState([null, null]);

    async function fetchTasks() {
        const response = await axios.get(`${SERVER_URL}/tasks`, {
            withCredentials: true
        });
        console.log(response);
        setTasks(response.data.data.tasks)
    }

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axios.get(`${SERVER_URL}/user/me`, {
                    withCredentials: true
                });
                setUserProfile(response.data.user)
                await fetchTasks()
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserProfile(); 
    }, [])

    return (
        <TasksContext.Provider value={{ tasks, userProfile, selectedFilter, filterStartDate, filterEndDate, selectedSort, dateRange, setTasks, setUserProfile, setSelectedFilter, setFilterStartDate, setFilterEndDate, setSelectedSort, setDateRange , fetchTasks }}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContext;
