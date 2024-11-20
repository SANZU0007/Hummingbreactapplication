import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { MonthlyAttendance } from '../../ApiService/api';
import Month from './mood/Month';

const MonthlyLoginMap = ({ employees }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalUsers = employees.length * 30; // Assume each employee should check in every day of the month

    useEffect(() => {
        const fetchMonthlyCheckIns = async () => {
            try {
                const response = await MonthlyAttendance(); 
                setCheckIns(response);
            } catch (err) {
                setError('Error fetching monthly check-ins');
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyCheckIns();
    }, []);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    const sampleData = [
        {
            _id: { year: 2024, month: 10 },
            records: [
                { _id: '6715422a31088e8c549778fe', employeeId: '67149d24f2e085c043dfa037', checkIn: '2024-10-20T17:47:22.992Z', checkOut: '2024-10-20T17:47:24.623Z', isCheckedIn: false },
                { _id: '6715480231088e8c54977a44', employeeId: '671331c21cc48f9c63a56430', checkIn: '2024-10-20T18:12:18.747Z', checkOut: '2024-10-20T18:12:21.747Z', isCheckedIn: false },
                { _id: '6715baf4515d4fd8ba4e91f8', employeeId: '671331c21cc48f9c63a56430', checkIn: '2024-10-21T02:22:44.986Z', checkOut: null, isCheckedIn: true }
            ]
        },
        {
            _id: { year: 2024, month: 11 },
            records: [
                { _id: '6714bb25d6064b968de83ac4', employeeId: '671331c21cc48f9c63a56430', checkIn: '2024-11-20T08:11:17.466Z', checkOut: '2024-11-20T08:12:16.409Z', isCheckedIn: false }
            ]
        }
    ];

    const dataToDisplay = checkIns.length > 0 ? checkIns : sampleData;

    // Group data by month and year
    const monthlyAttendanceMap = {};

    dataToDisplay.forEach((monthData) => {
        const { year, month } = monthData._id;
        const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

        if (!monthlyAttendanceMap[monthKey]) {
            monthlyAttendanceMap[monthKey] = {
                month: monthKey,
                totalCheckIns: 0,
                totalDays: 0,
            };
        }

        monthlyAttendanceMap[monthKey].totalCheckIns += monthData.records.length;
        monthlyAttendanceMap[monthKey].totalDays += 1;
    });

    // Calculate percentage based on the assumption of total possible check-ins per month
    const attendanceData = Object.values(monthlyAttendanceMap).map((monthData) => {
        const { month, totalCheckIns } = monthData;
        const totalExpectedCheckIns = totalUsers; // Assuming a general month (30 days) and employees.length
        const attendancePercentage = (totalCheckIns / totalExpectedCheckIns) * 100;

        return {
            month,
            percentage: attendancePercentage.toFixed(2),
        };
    });

    return (
        <>
        <Container className='map-bar'>
     

            <Typography style={{ color: "white" }} variant="h5" gutterBottom>
                Monthly Attendance Percentage
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <CartesianGrid strokeDasharray="3 3" />
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

        <Month checkIns={checkIns}/>
        </>
    );
};

export default MonthlyLoginMap;
