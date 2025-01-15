import { SERVER_URL } from '../../../config';
import React, { useState } from 'react'
import "./UpdatePasswordPage.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useNotification from '../../Hooks/useNotification';
import Loader from '../../assets/Loader/Loader';

function UpdatePasswordPage() {
    const [loaderActive,setLoaderActive]=useState(false);
    const navigate = useNavigate();
    const [notifications, closeNotification, addNotification] = useNotification()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errors, setErrors] = useState({});

    const regexPatterns = {
        newPassword: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, // At least 8 characters, with at least one alphabet and one number.
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'newPassword':
                return regexPatterns.newPassword.test(value) ? '' : 'New Password must be at least 8 characters long and contain atleast 1 alphabet and 1 digit.';
            case 'confirmNewPassword':
                return value === formData.newPassword ? '' : 'New Password and confirm password are not matching.';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);

        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if ((Object.keys(errors).length != 0)) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // Final validation before submitting
        const finalErrors = {};
        Object.keys(formData).forEach((key) => {
            finalErrors[key] = validateField(key, formData[key]);
        });

        setErrors(finalErrors);

        // If there are errors, do not proceed
        if (Object.values(finalErrors).some((error) => error)) {
            return;
        }

        setLoaderActive(true)

        try {
            const response = await axios.patch(`${SERVER_URL}/user/updatePassword`, {
                currentPassword: formData.currentPassword,
                password: formData.newPassword,
                confirmPassword: formData.confirmNewPassword
            },
                { withCredentials: true } // Enables sending cookies
            );
            console.log(response)
        setLoaderActive(false)

            navigate("/Todo-List/")
            addNotification("update", " Password Updated Successfully")
            // setUserProfile(response.data.data.user)
        } catch (error) {
            console.log(error.response.data);
        setLoaderActive(false)

            addNotification("fail", error.response.data.message)
            return;
        }

    }

    return (
        <div className="updatePassword-page">
            {loaderActive && <Loader />}

            <button className='back-button'
                onClick={() => navigate("/Todo-List/")}
            >Back to Home page</button>
            <div className="updatePassword-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="text"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter your Current Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                        />
                        <div className={`error ${errors.newPassword ? "show-error" : ""}`}>{errors.newPassword}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input
                            type="text"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            required
                        />
                        <div className={`error ${errors.confirmNewPassword ? "show-error" : ""}`}>{errors.confirmNewPassword}</div>
                    </div>
                    <button type="submit" className="updatePassword-button">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePasswordPage