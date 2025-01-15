import { SERVER_URL } from '../../../config';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignupPage.css';
import axios from 'axios';
import useNotification from '../../Hooks/useNotification';
import TasksContext from '../../Context/TasksContext';
import Loader from '../../assets/Loader/Loader';

const SignupPage = () => {
    const navigate = useNavigate();
    const [loaderActive,setLoaderActive]=useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [notifications, closeNotification, addNotification] = useNotification();
    const { setUserProfile } = useContext(TasksContext);

    const regexPatterns = {
        name: /^(?=.*[a-zA-Z]).{1,}$/, // At least one alphabet, allows anything else.
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // Basic email validation with a minimum of 2 characters after the last dot.
        password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, // At least 8 characters, with at least one alphabet and one number.
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return regexPatterns.name.test(value) ? '' : 'Enter valid name';
            case 'email':
                return regexPatterns.email.test(value) ? '' : 'Enter a valid email address.';
            case 'password':
                return regexPatterns.password.test(value) ? '' : 'Password must be at least 8 characters long and contain atleast 1 alphabet and 1 digit.';
            case 'confirmPassword':
                return value === formData.password ? '' : 'Passwords do not match.';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);

        setFormData((prevData) => ({ ...prevData, [name]: value }));
            if((Object.keys(errors).length!=0)){
                setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
            }
    };

    const handleSubmit = async (e) => {
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
            const response = await axios.post(`${SERVER_URL}/auth/signup`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            },
            { withCredentials: true } // Enables sending cookies
            );
            setLoaderActive(false)

            navigate("/Todo-List/");
            addNotification("signup", "Account Created Successfully");
            setUserProfile(response.data.data.user);
        } catch (error) {
            setLoaderActive(false)
            console.log(error.response.data.message);
            addNotification("signup", "Email already exist");
        }
    };

    return (
        <div className="signup-page">
            {loaderActive && <Loader />}
            <button className='back-button' onClick={() => navigate("/Todo-List/")}>Back to Home page</button>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                     <div className={`error ${errors.name?"show-error":""}`}>{errors.name}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                     <div className={`error ${errors.email?"show-error":""}`}>{errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                     <div className={`error ${errors.password?"show-error":""}`}>{errors.password}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                     <div className={`error ${errors.confirmPassword?"show-error":""}`}>{errors.confirmPassword}</div>
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="login-text">
                    Already have an account? <a onClick={() => navigate("/Todo-List/login")}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;

