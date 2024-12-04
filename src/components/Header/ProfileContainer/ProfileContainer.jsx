import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import "./ProfileContainer.css"
import ProfileContainerModal from '../../../assets/ProfileContainerModal/ProfileContainerModal';
import axios from 'axios';
import TasksContext from '../../../Context/TasksContext';

function ProfileContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);  // Create a ref for the modal
    const buttonRef = useRef(null);  // Create a ref for the button
    const { userProfile } = useContext(TasksContext);


    function toggleModalVisibility() {
        setIsModalOpen(prev => !prev); // Toggle modal open/close on button click
    }

    useEffect(() => {
        function handleClickOutside(event) {

            // Check if the click is outside the modal or the button
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
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

    return (
        <div className="profile-container">
            <div className='profile' onClick={toggleModalVisibility} ref={buttonRef}>
                {userProfile?.photo ? (<img src={userProfile?.photo} className='profile-photo-small'/>):( <FaUserCircle size={23} />)}
                <span className='login'>{userProfile?.name || "Login"}</span>
                <IoIosArrowDown />
            </div>
            {isModalOpen && <ProfileContainerModal ref={modalRef} />}
        </div>

    )
}

export default ProfileContainer