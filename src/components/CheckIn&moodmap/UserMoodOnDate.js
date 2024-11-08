import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
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

const UserMoodOnDate = ({ employees }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');  // Date selected by the user
    const [moodData, setMoodData] = useState([]);  // Mood data for selected date

    const totalUsers = employees.length;

    // Set the selected date to the current date by default
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];  // Get date in yyyy-mm-dd format
        setSelectedDate(formattedDate);
    }, []);

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

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);  // Update the selected date
    };

    useEffect(() => {
        if (selectedDate) {
            const filteredData = checkIns.filter(checkIn => {
                const { year, month, day } = checkIn._id;
                const checkInDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                return checkInDate === selectedDate;
            });

            // Extract mood data for employees on the selected date
            const moodDataForDate = filteredData.flatMap((checkIn) => {
                return checkIn.records.map((record) => {
                    const matchedEmployee = employees.find(emp => emp._id === record.employeeId);
                    return {
                        employeeName: matchedEmployee ? matchedEmployee.name : 'Unknown',
                        userMood: record.userMood || 0, // Default to 0 if no mood data
                    };
                });
            });

            setMoodData(moodDataForDate);
        }
    }, [selectedDate, checkIns, employees]);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    // If there's no mood data for the selected date, show a message
    if (moodData.length === 0) {
        return (
            <div>
                <input type='date' onChange={handleDateChange} value={selectedDate}/>
                
                <h1>No mood data available for the selected date</h1>
            </div>
        );
    }

    return (
        <>
            <Container className='map-bar'>
                <Typography style={{ color: "white" }} variant="h5" gutterBottom>
                    User Mood for {selectedDate}
                </Typography>

                {/* Date Picker */}
                <input type='date' onChange={handleDateChange} value={selectedDate}/>

                {/* Bar Chart for user mood data */}
                {moodData.length > 0 && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={moodData}>
                            <XAxis dataKey="employeeName" />
                            <YAxis domain={[0, 100]} /> {/* Assuming mood score is between 0 and 10 */}
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value) => `${value} Mood`} />
                            <Legend verticalAlign="bottom" align="center" />
                            <Bar dataKey="userMood" fill="#2278c1" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Container>
        </>
    );
};

export default UserMoodOnDate;
