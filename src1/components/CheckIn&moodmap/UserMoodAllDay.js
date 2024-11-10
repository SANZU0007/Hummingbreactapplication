import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import MoodGraph from './MoodGraph';
// import AdminUserMood from './AdminUserMood';
import { apiUrl } from '../../api';

const UserMoodAllDay = ({ employees }) => {
    const [checkInData, setCheckInData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCheckInData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/attendance/all-checkins/`);
                const formattedData = response.data.map(item => {
                    const matchedEmployee = employees.find(emp => emp._id === item.employeeId);
                    
                    // Extract date and time separately from checkIn
                    const checkInDate = item.checkIn ? new Date(item.checkIn).toLocaleDateString() : 'N/A';
                    const checkInTime = item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : 'N/A';
                    const checkOutTime = item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : 'Not yet checked out';

                    return {
                        ...item,
                        employeeName: matchedEmployee ? matchedEmployee.name : 'Unknown',
                        checkInDate,
                        checkInTime,
                        checkOutTime,
                    };
                });
                setCheckInData(formattedData);
            } catch (err) {
                console.error("Error fetching check-in data:", err);
                setError("Failed to fetch check-in data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCheckInData();
    }, [employees]);

    const columns = [
        { field: 'employeeName', headerName: 'Employee Name', width: 200 },
        { field: 'checkInDate', headerName: 'Check-In Date', width: 150 },  // New column for date
        { field: 'checkInTime', headerName: 'Check-In Time', width: 150 },  // Column for time only
        { field: 'checkOutTime', headerName: 'Check-Out Time', width: 150 },
        // { field: 'userMood', headerName: 'User Mood', width: 130 },
        { field: 'earlyDispatch', headerName: 'Early Departures', width: 150 },
        { field: 'lateArrival', headerName: 'Late Arrival', width: 130 }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Reverse the order of the checkInData
    const reversedCheckInData = [...checkInData].reverse();

    return (
        <div>
            <br />
            <h1 style={{ color: "white" }}>All User Login Details</h1>
            <DataGrid 
                style={{ color: "white" }}
                rows={reversedCheckInData.map((item, index) => ({ id: index, ...item }))}
                columns={columns}
                pageSize={5}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'black',
                        color: 'black',
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'white',
                    },
                    '& .MuiDataGrid-row': {
                        backgroundColor: '#1e1e1e',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#333',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'black',
                        color: 'white',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'white',
                    }
                }}
            />
            <br /> <br />
            {/* <MoodGraph checkInData={checkInData} /> */}
            {/* <AdminUserMood checkInData={checkInData} /> */}
        </div>
    );
};

export default UserMoodAllDay;
