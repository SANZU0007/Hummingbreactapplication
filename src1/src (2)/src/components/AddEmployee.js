import React, { useState } from 'react';
import '../styles/addEmployee.css';

export default function AddEmployee() {
    const [employeeData, setEmployeeData] = useState({
        empId: '',
        name: '',
        email: '',
        mobile: '',
        dob: '',
        department: '',
        employment: '',
        photo: null,
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    const addEmployee = (e) => {
        e.preventDefault();
        // Handle form submission
        if (employeeData.password !== employeeData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log('Employee added:', employeeData);
        // Handle further submission logic like API calls
    };

    return (
        <div id="add-emp">
            <div className="heading">
                <h1>Add Employee</h1>
                <button onClick={() => alert('Close functionality to be implemented')}>Close</button>
            </div>
            <form onSubmit={addEmployee}>
                <div className="field">
                    <h3>EmpId</h3>
                    <input
                        type="text"
                        name="empId"
                        value={employeeData.empId}
                        onChange={handleInputChange}
                        placeholder="Enter Your EmpId"
                    />
                </div>
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
                        <h3>Mobile No.</h3>
                        <input
                            type="tel"
                            name="mobile"
                            value={employeeData.mobile}
                            onChange={handleInputChange}
                            placeholder="Enter your Mobile No."
                        />
                    </div>
                    <div className="field">
                        <h3>DOB</h3>
                        <input
                            type="date"
                            name="dob"
                            value={employeeData.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <h3>Department</h3>
                        <select
                            name="department"
                            value={employeeData.department}
                            onChange={handleInputChange}
                        >
                            <option value="Development">Development</option>
                            <option value="Management">Management</option>
                        </select>
                    </div>
                    <div className="field">
                        <h3>Employment</h3>
                        <select
                            name="employment"
                            value={employeeData.employment}
                            onChange={handleInputChange}
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>
                    <div className="field">
                        <h3>Photo</h3>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className="two-col">
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
                        <h3>Confirm Password</h3>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={employeeData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Retype password"
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
