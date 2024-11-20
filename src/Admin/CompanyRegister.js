import React, { useState } from 'react';
import "../styles/addEmployee.css"
import axios from 'axios';

import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiUrl } from '../api';

export default function AddCompany({ loadComponent }) {
    const [companyData, setCompanyData] = useState({
        name: '',
        industry: '',
        location: '',
        email: '',
        phone: '',
        website: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const registerCompany = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${apiUrl}/companies/register`, companyData);
            alert("Company registered successfully!");
            console.log(response);
            loadComponent('CompanyList'); // Close form on success
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error registering company:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{height:"100vh"}} id="add-emp">
            <div className="heading">
                <h1>Register Company</h1>
                <button onClick={() => loadComponent('CompanyList')}>Close</button>
            </div>
            <form onSubmit={registerCompany}>
                {error && (
                    <Alert
                        severity="error"
                        className="error-alert"
                        style={{ marginBottom: '1rem' }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setError('')}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {error}
                    </Alert>
                )}
                <div className="two-col">
                    <div className="field">
                        <h3>Company Name</h3>
                        <input
                            type="text"
                            name="name"
                            value={companyData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Company Name"
                        />
                    </div>
                    <div className="field">
                        <h3>Industry</h3>
                        <input
                            type="text"
                            name="industry"
                            value={companyData.industry}
                            onChange={handleInputChange}
                            placeholder="Enter Industry"
                        />
                    </div>
                    <div className="field">
                        <h3>Location</h3>
                        <input
                            type="text"
                            name="location"
                            value={companyData.location}
                            onChange={handleInputChange}
                            placeholder="Enter Location"
                        />
                    </div>
                    <div className="field">
                        <h3>Email</h3>
                        <input
                            type="email"
                            name="email"
                            value={companyData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Company Email"
                        />
                    </div>
                    <div className="field">
                        <h3>Phone</h3>
                        <input
                            type="text"
                            name="phone"
                            value={companyData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter Contact Number"
                        />
                    </div>
                    <div className="field">
                        <h3>Website</h3>
                        <input
                            type="text"
                            name="website"
                            value={companyData.website}
                            onChange={handleInputChange}
                            placeholder="Enter Website URL"
                        />
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Register"}
                </button>
            </form>
        </div>
    );
}
