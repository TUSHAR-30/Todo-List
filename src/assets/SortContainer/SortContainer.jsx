import React, { useRef, useState , useEffect, useContext } from 'react'
import "./SortContainer.css"
import TasksContext from '../../Context/TasksContext';
function SortContainer() {
  const { selectedSort , setSelectedSort } = useContext(TasksContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);  // Create a ref for the modal
  const buttonRef = useRef(null);  // Create a ref for the button

  function toggleModalVisibility() {
    setIsModalOpen(prev => !prev); // Toggle modal open/close on button click
  }

  function handleSortChange(event) {
   setSelectedSort(event.target.value)
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
}, [selectedSort])


  return (
    <div className='sortby-container'>
      <button onClick={toggleModalVisibility} ref={buttonRef}>Sort by</button>

      {isModalOpen && (
        <div className='sortby-modal' ref={modalRef}>
          <h4>Sort by:</h4>
          <div className='sortby-list'>
            <div className={`sortby-listitem ${selectedSort=="Sort by Alphabatically"?"checkedsort":""}`}>
              <input type="radio"
                id='Sort by Alphabatically'
                name="selectedSortOption"
                value="Sort by Alphabatically"
                onChange={handleSortChange}
                checked={ selectedSort ==  "Sort by Alphabatically" }
              />
              <label htmlFor="Sort by Alphabatically">Alphabatically</label>
            </div>
            <div className={`sortby-listitem ${selectedSort=="Sort by Task Creation Date"?"checkedsort":""}`}>
              <input type="radio"
                id='Sort by Task Creation Date'
                name="selectedSortOption"
                value="Sort by Task Creation Date"
                onChange={handleSortChange}
                checked={ selectedSort ==  "Sort by Task Creation Date" }
              />
              <label htmlFor="Sort by Task Creation Date">Task Creation Date</label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SortContainer