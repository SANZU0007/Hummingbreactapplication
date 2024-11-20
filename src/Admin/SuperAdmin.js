import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/addEmployee.css";
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiUrl } from '../api';

export default function SuperAdmin() {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        team: '',
        role: '',
        password: '',
        companyName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [companyOptions, setCompanyOptions] = useState([]); // State to store fetched companies

    useEffect(() => {
        // Fetch company names from API on component mount
        const fetchCompanyNames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/companies/names`);
                setCompanyOptions(response.data.companyNames); // Assuming API response structure
            } catch (err) {
                console.error("Error fetching company names:", err);
                setError("Failed to load company names. Please try again.");
            }
        };

        fetchCompanyNames();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const addEmployee = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear previous error

        try {
            const response = await axios.post(`${apiUrl}/api/users/register`, employeeData);
            alert("User added successfully!");
            console.log(response);
        
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error adding employee:", err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div id="add-emp">
            <div className="heading">
                <h1>Add Employee</h1>
            </div>
            <form onSubmit={addEmployee}>
                {/* Display error message using Material-UI Alert with a close button */}
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
                        <h3>Name</h3>
                        <input
                            type="text"
                            name="name"
                            value={employeeData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your Name"
                        />
                    </div>
                    <div className="field">
                        <h3>Email</h3>
                        <input
                            type="email"
                            name="email"
                            value={employeeData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your Email ID"
                        />
                    </div>
                    <div className="field">
                        <h3>Department</h3>
                        <select
                            name="team"
                            value={employeeData.team}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Department</option>
                            <option value="Development">Development</option>
                            <option value="Management">Management</option>
                            <option value="Design">Design</option>
                            <option value="Team">Team</option>
                        </select>
                    </div>
                    <div className="field">
                        <h3>Role</h3>
                        <select
                            name="role"
                            value={employeeData.role}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Role</option>
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                            <option value="TL">TL</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>
                    <div className="field">
                        <h3>Password</h3>
                        <input
                            type="password"
                            name="password"
                            value={employeeData.password}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                        />
                    </div>
                    <div className="field">
                        <h3>Company</h3>
                        <select
                            name="companyName"
                            value={employeeData.companyName}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Company</option>
                            {companyOptions.map((company, index) => (
                                <option key={index} value={company}>
                                    {company}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
