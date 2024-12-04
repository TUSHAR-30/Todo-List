import { SERVER_URL } from '../../../config';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import axios from 'axios';
import useNotification from '../../Hooks/useNotification';
import TasksContext from '../../Context/TasksContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notifications, closeNotification, addNotification] = useNotification()
    const { setUserProfile,fetchTasks } = useContext(TasksContext);


    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add your login logic here
        try {
            const response = await axios.post(`${SERVER_URL}/auth/login`, {
              email: email,
              password: password,
            },
            { withCredentials: true } // Enables sending cookies
            );
            await fetchTasks();
            navigate("/Todo-List/")
            addNotification("login", " User Login Successfully")
            setUserProfile(response.data.data.user)
          } catch (error) {
            console.error(error.response.data);
            addNotification("login", "Incorrect email or password")
            return;
          }

    };

    return (
        <div className="login-page">
            <button className='back-button' onClick={()=>navigate("/Todo-List/")}>Back to Home page</button>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <a onClick={()=>navigate("/Todo-List/signup")}>Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
