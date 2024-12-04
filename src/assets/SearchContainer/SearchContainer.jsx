import React, { useContext, useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import "./SearchContainer.css"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SearchContext from '../../Context/SearchContext';
import TasksContext from '../../Context/TasksContext';
import Task from '../../components/Tasks/Task';

function SearchContainer() {
    const { isSearchIconClicked, setIsSearchIconClicked } = useContext(SearchContext)
    const { tasks } = useContext(TasksContext);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce effect to update debouncedSearch after 0.2 seconds of no typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 200); // 0.2 seconds

        return () => clearTimeout(timer);
    }, [search]);

    // Filter tasks based on debounced search input
    const filteredTasks = debouncedSearch
        ? tasks.filter(task => task.title.toLowerCase().startsWith(debouncedSearch.toLowerCase()))
        : [];


    if (isSearchIconClicked) {
        useGSAP(() => {
            gsap.to(".anothersearchicon", {
                display: 'none'
            })
            gsap.to(".searchsystem", {
                transform: "scale(1)",
                display: 'block',
                y: -100,
                delay: 0.6
            })
        }, [isSearchIconClicked])
    }
    if (!isSearchIconClicked) {
        useGSAP(() => {
            gsap.to(".anothersearchicon", {
                display: 'block'
            })
            gsap.to(".searchsystem", {
                transform: "scale(0)",
                display: 'none',
            })
        }, [isSearchIconClicked])
    }


    return (
        <div className='searchcontainer'>
            <div className="anothersearchicon">
                <IoSearchSharp size={23} />
            </div>
            <div className='searchsystem'>
                <h2 className='search-heading'>Search Your Task </h2>
                <div className="searchplace">
                    <input
                        type="search"
                        placeholder="Search tasks by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <IoSearchSharp size={23} />
                </div>
                {!filteredTasks.length && debouncedSearch && (
                    <div className="search-summary" >No such entered task title found.</div>
                )}
                {
                    isSearchIconClicked && (
                        <div className="searchresults">
                            {!filteredTasks.length && (
                                <div style={{ height: '220px' }}>
                                    <dotlottie-player src="https://lottie.host/466171c6-518a-4115-837f-e37bf2e4c3d5/I3W2AT0Tlc.json" speed="1" autoplay loop></dotlottie-player>
                                    <div className="search-note">Enter Your Task title to search</div>
                                </div>
                            )}
                            {
                                filteredTasks.map((task) => (
                                    <Task
                                        key={task.id}
                                        task={task}
                                    />
                                ))

                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchContainer