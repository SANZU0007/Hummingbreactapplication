import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { apiUrl } from '../api';

function Login() { 
    const [logUserData, setlogUserData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, {
                email: logUserData.email,
                password: logUserData.password,
            });

           
                localStorage.setItem('user', JSON.stringify(response.data.user));

                if(response.data.user.role == 'Employee'){
                   navigate('/takeSurvey/graphs')
                }
                if(response.data.user.role == 'TL'){
                    navigate('/tldashboard')
                 } else{
                    navigate("/hrdashboard")
                }

                
                
               
           
        } catch (error) {
            // Handle any unexpected errors
            console.error("Login failed. Please try again.", error);
        }
    };

    return (
        <div className='signup-container'>
            <div className='content'>
                <div className='heading-1'>Humming BEE</div>
                <div className='heading-2'>Login Here</div>
                <form className='form-container' onSubmit={handleSubmit}>
                    <div className='signup-input-container'>
                        <div className='input-label'>Email</div>
                        <input
                            type='email'
                            value={logUserData.email}
                            onChange={(e) => setlogUserData({ ...logUserData, email: e.target.value })}
                            className='input-box'
                            placeholder='email@example.com'
                            required
                        />
                    </div>
                    <div className='signup-input-container'>
                        <div className='input-label'>Password</div>
                        <input
                            type='password'
                            value={logUserData.password}
                            onChange={(e) => setlogUserData({ ...logUserData, password: e.target.value })}
                            className='input-box'
                            placeholder='at least 8 characters'
                            required
                        />
                    </div>
                    <button type="submit" className='sub-btn'>Submit</button>
                    <div className='link-container'>
                        <br></br>
                        <Link to="/Signup" className='register-link'>
                            Don't have an account? Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

