import React, { useEffect } from 'react'
import SearchContainer from '../../assets/SearchContainer/SearchContainer'
import Header from '../../components/Header/Header'
import Greetings from '../../components/Greetings/Greetings'
import ProductDiscoveryOptions from '../../components/ProductDiscoveryOptions/ProductDiscoveryOptions'
import ProductDiscoveryResults from '../../components/ProductDiscoveryResults/ProductDiscoveryResults'
import AddTask from '../../components/AddTask/AddTask'
import Tasks from '../../components/Tasks/Tasks'
import "./HomePage.css"
import { useDispatch } from 'react-redux'
import {fetchUserData } from '../../store/slices/userSlice'
import { fetchUserTasks } from '../../store/slices/tasksSlice'

function HomePage() {

    // const dispatch = useDispatch()
    // useEffect(() => {
    //     // Define an async function inside the effect
    //     const initializeData = async () => {
    //       try {
    //         await dispatch(fetchUserData());
    //         await dispatch(fetchUserTasks());
    //       } catch (error) {
    //         console.error('Error initializing data:', error);
    //       }
    //     };
    
    //     // Call the async function
    //     initializeData();
    //   }, [dispatch]); 

    return (
        <div className='homepage'>
            <div className="homepage-content">
                <SearchContainer />
                <Header />
                <Greetings />
                <ProductDiscoveryOptions />
                <ProductDiscoveryResults />
                <AddTask />
                <Tasks />
            </div>
        </div>
    )
}

export default HomePage