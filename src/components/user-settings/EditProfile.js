import React, { useState } from 'react';
// import '../styles/addEmployee.css';
import axios from 'axios';
import { apiUrl } from '../../api';

export default function EditProfile({loadComponent}) {
    const data = JSON.parse(localStorage.getItem('user'))
    const [employeeData, setEmployeeData] = useState({
        // empId: '',
        name: data.name,
        email: data.email,
        // mobile: '',
        // dob: '',
        team: data.team,
        role: data.role,
        image: '',
        password: '',
        // companyName:data.companyName
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

    const addEmployee = async (e) => {
        e.preventDefault();
        if (employeeData.password.length<8) {
            alert("Password requires minimum 8 digits");
            return;
        }
        // console.log('Employee added:', employeeData);
        const response = await axios.put(`${apiUrl}/api/users/register/${data._id}`, employeeData);
        console.log(response);
        alert('Profile updated successfully')
        loadComponent('Graphs')
    };

    return (
        <div id="add-emp">
            <div className="heading">
                <h1>Edit Profile</h1>
                <button onClick={() => alert('Close functionality to be implemented')}>Close</button>
            </div>
            <form onSubmit={addEmployee}>
                {/* <div className="field">
                    <h3>EmpId</h3>
                    <input
                        type="text"
                        name="empId"
                        value={employeeData.empId}
                        onChange={handleInputChange}
                        placeholder="Enter Your EmpId"
                    />
                </div> */}
                <div className="two-col">
                    <div className="field">
                        <h3>Name</h3>
                        <input
                            type="text"
                            name="name"
                            value={employeeData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your Name"
                            disabled
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
                            disabled
                        />
                    </div>
                    {/* <div className="field">
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
                    </div> */}
                    <div className="field">
                        <h3>Department</h3>
                        <select
                            name="team"
                            value={employeeData.team}
                            onChange={handleInputChange}
                            disabled
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
                            disabled
                        >
                            <option value="">Select Role</option>
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                            <option value="TL">TL</option>
                            <option value="Administrator">Administrator</option>
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
                    <div className="field">
                        <h3>Change Password</h3>
                        <input
                            type="password"
                            name="password"
                            value={employeeData.password}
                            onChange={handleInputChange}
                            placeholder="Enter new Password"
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
