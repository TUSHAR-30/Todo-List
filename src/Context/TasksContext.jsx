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
    const [loaderActive,setLoaderActive]=useState(true)
    const [selectedFilter, setSelectedFilter] = useState("All Tasks");
    const [filterStartDate, setFilterStartDate] = useState("")
    const [filterEndDate, setFilterEndDate] = useState("")
    const [selectedSort, setSelectedSort] = useState("")
    const [dateRange, setDateRange] = useState([null, null]);

    async function fetchTasks() {
        const response = await axios.get(`${SERVER_URL}/tasks`, {
            withCredentials: true
        });
        setTasks(response.data.data.tasks)
    }

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axios.get(`${SERVER_URL}/user/me`, {
                    withCredentials: true
                });
                const data=response.data
                setUserProfile(data.user)
                await fetchTasks()
                setLoaderActive(false);
            } catch (error) {
                // console.log(error);
                setLoaderActive(false);
            }
        }
        fetchUserProfile(); 
    }, [])

    return (
        <TasksContext.Provider value={{ tasks, userProfile, loaderActive , selectedFilter, filterStartDate, filterEndDate, selectedSort, dateRange, setTasks, setUserProfile, setSelectedFilter, setFilterStartDate, setFilterEndDate, setSelectedSort, setDateRange , fetchTasks , setLoaderActive }}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContext;
