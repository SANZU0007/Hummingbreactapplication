import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import '../styles/signup.css';
import { apiUrl } from '../api';

function Login() { 
    const [logUserData, setlogUserData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Check email format
        if (!validateEmail(logUserData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, {
                email: logUserData.email,
                password: logUserData.password,
            });

            localStorage.setItem('user', JSON.stringify(response.data.user));
            const userRole = response.data.user.role;

            if(userRole === 'Employee'){
                navigate('/takeSurvey/graphs');
            } else if(userRole === 'TL'){
                navigate("/tldashboard");
                // Navigate to TL dashboard or add a route as required
            } else if(userRole === 'Administrator'){
                navigate('/Admindashboard');
            } else {
                navigate("/hrdashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your email and password.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='signup-container'>
            <div className='content'>
                <div className='heading-1'>Humming BEE</div>
                <div className='heading-2'>Login Here</div>
                
                {/* Display Error Alert if there's an error */}
                {error && (
                    <Alert severity="error" className="alert-box">
                        {error}
                    </Alert>
                )}
                
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
                    
                    {/* Show loading spinner while submitting */}
                    <button type="submit" className='sub-btn' disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                    </button>
                    
                  
                </form>
            </div>
        </div>
    );
}

export default Login;

