import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid, // Import CartesianGrid
} from 'recharts';
import { v4 as uuidv4 } from 'uuid'; 
import { WeeklyAttendance } from '../../ApiService/api';
import Week from './mood/Week';

const WeeklyUserLoginMap = ({ employees }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalUsers = employees.length * 7;

    useEffect(() => {
        const fetchWeeklyCheckIns = async () => {
            try {
                const response =  await WeeklyAttendance(); 
                setCheckIns(response);
            } catch (err) {
                setError('Error fetching weekly check-ins');
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyCheckIns();
    }, []);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    const sampleData = [
        {
            _id: { year: 2024, week: 1 },
            records: [
                { _id: uuidv4(), employeeId: "EMP001", checkIn: new Date("2024-01-01T08:00:00Z") },
                { _id: uuidv4(), employeeId: "EMP002", checkIn: new Date("2024-01-01T08:30:00Z") }
            ]
        },
        {
            _id: { year: 2024, week: 2 },
            records: [
                { _id: uuidv4(), employeeId: "EMP001", checkIn: new Date("2024-01-08T08:00:00Z") },
                { _id: uuidv4(), employeeId: "EMP002", checkIn: new Date("2024-01-08T08:15:00Z") },
                { _id: uuidv4(), employeeId: "EMP004", checkIn: new Date("2024-01-08T08:45:00Z") }
            ]
        },
        {
            _id: { year: 2024, week: 3 },
            records: [
                { _id: uuidv4(), employeeId: "EMP001", checkIn: new Date("2024-01-15T08:10:00Z") },
                { _id: uuidv4(), employeeId: "EMP003", checkIn: new Date("2024-01-15T08:20:00Z") },
                { _id: uuidv4(), employeeId: "EMP005", checkIn: new Date("2024-01-15T09:00:00Z") }
            ]
        },
        {
            _id: { year: 2024, week: 4 },
            records: [
                { _id: uuidv4(), employeeId: "EMP002", checkIn: new Date("2024-01-22T08:00:00Z") },
                { _id: uuidv4(), employeeId: "EMP003", checkIn: new Date("2024-01-22T08:30:00Z") },
                { _id: uuidv4(), employeeId: "EMP006", checkIn: new Date("2024-01-22T09:15:00Z") }
            ]
        }
    ];

    const dataToDisplay = checkIns.length > 0 ? checkIns : sampleData;

    const attendanceData = dataToDisplay.map((checkIn) => {
        const attendanceCount = checkIn.records.length;
        const attendancePercentage = (attendanceCount / totalUsers) * 100;
        return {
            week: `Week ${checkIn._id.week}`,
            year: checkIn._id.year,
            percentage: attendancePercentage,
        };
    });

    return (

        <>
        <Container className='map-bar'>
            <Typography style={{color:"white"}} variant="h5" gutterBottom>
                Weekly Attendance Percentage
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <CartesianGrid strokeDasharray="3 3" /> {/* Add CartesianGrid for lines */}
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" />
                    <Bar
                        dataKey="percentage"
                        fill="#00897b"
                        barSize={50}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Container>


        <Week checkIns={checkIns}/>

        </>
    );
};

export default WeeklyUserLoginMap;
