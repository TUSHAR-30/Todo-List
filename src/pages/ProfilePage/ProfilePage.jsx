import { SERVER_URL } from '../../../config';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaUser } from 'react-icons/fa'; // For photo icon
import { FaUserCircle } from "react-icons/fa";
import TasksContext from '../../Context/TasksContext';
import './ProfilePage.css';
import axios from 'axios';
import useNotification from '../../Hooks/useNotification';
import DeleteUserModalContent from '../../assets/Modal/DeleteUserModalContent/DeleteUserModalContent';
import Modal from '../../assets/Modal/ModalOverlay/Modal';
import Loader from '../../assets/Loader/Loader';


const ProfilePage = () => {
    const navigate = useNavigate();
    const [loaderActive,setLoaderActive]=useState(false);
    const { userProfile, setUserProfile } = useContext(TasksContext);
    const [notifications, closeNotification, addNotification] = useNotification()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({
        profilePhoto: userProfile?.photo, //
        name: userProfile?.name,
        email: userProfile?.email,
    });
    const [isSaveBtnEnabled, setIsSaveBtnEnabled] = useState(false)

    const handleUpdatePassword = () => {
        navigate('/Todo-List/updatePassword')
    };

    const handleDeleteProfile = () => {
       setIsModalOpen(true)
    };

    const handleNameChange = (e) => {
        setUser((prev) => ({ ...prev, name: e.target.value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the selected file to show it on the client side
            const objectURL = URL.createObjectURL(file);

            // Update the state with the file (for sending to server) and the object URL (for displaying)
            setUser((prev) => ({
                ...prev,
                profilePhoto: objectURL, // Store the object URL for displaying the image
                profilePhotoFile: file,  // Store the actual file for uploading to the server
            }));
        }
    };

    async function updateProfile() {
        try {
            const formData = new FormData();
            formData.append("name", user.name);

            // Append the actual file object to FormData for sending to the server
            if (user.profilePhotoFile) {
                formData.append("photo", user.profilePhotoFile);
            }
            setLoaderActive(true)

            const response = await axios.patch(
                `${SERVER_URL}/user/updateMe`,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
                }
            );
            setLoaderActive(false)

            setUserProfile(response.data.data.updatedUser);
            addNotification("profile", "Account Updated Successfully")
        } catch (error) {
            setLoaderActive(false)

            console.log(error.response.data.message);
            addNotification("profile",error.response.data.message )
            return;
        }
    }

    useEffect(() => {
        if (userProfile?.name != user.name || userProfile?.photo != user.profilePhoto) {
            setIsSaveBtnEnabled(true)
        }
        else {
            setIsSaveBtnEnabled(false)
        }
    }, [user])

    useEffect(() => {
        setUser({
            profilePhoto: userProfile?.photo,
            name: userProfile?.name,
            email: userProfile?.email,
        })
    }, [userProfile])


    return (
        <div className="profile-page">
            {loaderActive && <Loader />}
            <button className="back-button" onClick={() => navigate('/Todo-List/')}>Back to Home page</button>
            <div className="profile-card">
                <div className="photo-container">
                    {user.profilePhoto ? (<img src={user.profilePhoto} alt="Profile" className="profile-photo" />) : (
                        <FaUserCircle className='profile-photo' />
                    )}
                        {/* <label htmlFor="upload-photo" className="edit-photo-icon">
                            <FaPencilAlt />
                            <input
                                type="file"
                                id="upload-photo"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handlePhotoChange}
                            />
                        </label> */}
                </div>
                <input
                    type="text"
                    value={user.name}
                    onChange={handleNameChange}
                    className="name-input"
                    placeholder="Enter your name"
                />
                <p className="email">{user.email}</p>
                <button className="update-button" onClick={handleUpdatePassword}>Update Password</button>
                <button className="delete-button" onClick={handleDeleteProfile}>Delete Profile</button>
                {isSaveBtnEnabled && <div className="save-btn" onClick={updateProfile}>Save changes</div>}
            </div>
           
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DeleteUserModalContent setIsModalOpen={setIsModalOpen} />
            </Modal>
            
        </div>
    );
};

export default ProfilePage;


