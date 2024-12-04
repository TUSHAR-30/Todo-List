import React, { useContext, useEffect, useRef, useState } from 'react';
import TasksContext from '../../Context/TasksContext';
import FilterHeader from './FilterHeader';
import FilterList from './FilterList';
import "./FilterContainer.css";

function FilterContainer() {
    const { selectedFilter, setSelectedFilter } = useContext(TasksContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const modalRef = useRef(null);  // Create a ref for the modal
    const buttonRef = useRef(null);  // Create a ref for the button

    function toggleModalVisibility() {
        setIsModalOpen(prev => !prev); // Toggle modal open/close on button click
    }

    function handleFilterChange(event) {
        setSelectedFilter(event.target.value);
    }

    useEffect(() => {
        function handleClickOutside(event) {

            // Check if the click is outside the modal or the button
            if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsModalOpen(false); // Close the modal on outside click
            }
        }

        if (isModalOpen) {
            // Attach the event listener only when the modal is open
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remove the event listener when the modal is closed
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]); // Re-run effect when isModalOpen changes

    useEffect(() => {
        setIsModalOpen(false)
    }, [selectedFilter])

    return (
        <div className='filterby-container'>
            <button onClick={toggleModalVisibility} ref={buttonRef} >Filter by </button>
            {isModalOpen && (
                <div className='filterby-modal' ref={modalRef} >
                   <FilterHeader />
                   <FilterList selectedFilter={selectedFilter} handleFilterChange={handleFilterChange}/>
                </div>
            )}
        </div>
    );
}

export default FilterContainer;
