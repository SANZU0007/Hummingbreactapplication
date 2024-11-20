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
import { EveryDayAttendance } from '../../ApiService/api';
import Daily from './mood/Daily';

const DiallyLoginMap = ({ employees }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalUsers = employees.length;

    useEffect(() => {
        const fetchDailyCheckIns = async () => {
            try {
                const response = await EveryDayAttendance(); 
                setCheckIns(response);
            } catch (err) {
                setError('Error fetching daily check-ins');
            } finally {
                setLoading(false);
            }
        };

        fetchDailyCheckIns();
    }, []);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    const sampleData = [
        {
            _id: { year: 2024, month: 10, day: 20 },
            records: [
                { _id: '6715422a31088e8c549778fe', employeeId: '67149d24f2e085c043dfa037', checkIn: '2024-10-20T17:47:22.992Z', checkOut: '2024-10-20T17:47:24.623Z', isCheckedIn: false },
                { _id: '6715480231088e8c54977a44', employeeId: '671331c21cc48f9c63a56430', checkIn: '2024-10-20T18:12:18.747Z', checkOut: '2024-10-20T18:12:21.747Z', isCheckedIn: false }
            ]
        },
        {
            _id: { year: 2024, month: 10, day: 21 },
            records: [
                { _id: '6715baf4515d4fd8ba4e91f8', employeeId: '671331c21cc48f9c63a56430', checkIn: '2024-10-21T02:22:44.986Z', checkOut: null, isCheckedIn: true }
            ]
        }
    ];

    const dataToDisplay = checkIns.length > 0 ? checkIns : sampleData;

    const attendanceData = dataToDisplay.map((checkIn) => {
        const attendanceCount = checkIn.records.length;
        const attendancePercentage = (attendanceCount / totalUsers) * 100;
        const { year, month, day } = checkIn._id;
        return {
            date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            percentage: attendancePercentage,
        };
    });

    return (
        <>
        <Container className='map-bar'>
            <Typography style={{ color: "white" }} variant="h5" gutterBottom>
                Daily Attendance Percentage
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                    <XAxis dataKey="date" />
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
       
      <div className='map-bar'>
       <Daily  checkIns={checkIns}/>
       </div>

        </>
    );
};

export default DiallyLoginMap;
