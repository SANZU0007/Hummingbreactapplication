import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Define inline styles
const styles = {
    chartContainer: {
        backgroundColor: '#1e1e1e',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    title: {
        color: '#ffffff',
        marginBottom: '16px',
        textAlign: 'center',
    },
    footer: {
        marginTop: '16px',
        color: '#ffffff',
        textAlign: 'center',
    },
};

// Function to group data by date
const groupDataByDate = (data) => {
    const groupedData = {};

    data.forEach((item) => {
        const date = new Date(item.checkIn).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(item.userMood || 0);
    });

    // Convert to array suitable for LineChart
    return Object.keys(groupedData).map((date) => {
        const moods = groupedData[date];
        return {
            date,
            averageMood: moods.reduce((a, b) => a + b, 0) / moods.length, // Average mood for the date
        };
    });
};

const AdminUserMood = ({ checkInData }) => {
    console.log(checkInData);

    // Prepare data for the graph
    const graphData = groupDataByDate(checkInData);

    return (
        <div style={styles.chartContainer}>
            <h1 style={{ ...styles.title, fontWeight: 'bold', fontSize: '24px', letterSpacing: '0.5px' }}>
    Average Daily User Mood Status
</h1>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#ffffff" 
                        label={{ value: "Date", position: "insideBottomRight", offset: -5 }} 
                    />
                    <YAxis domain={[0, 100]} stroke="#ffffff" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    
                    <Line 
                        type="monotone" 
                        dataKey="averageMood" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={{ r: 5, fill: '#8884d8' }} 
                    />
                </LineChart>
            </ResponsiveContainer>
            <div style={styles.footer}>
                <p>Total Mood Entries: {checkInData.length}</p>
            </div>
        </div>
    );
};

export default AdminUserMood;

