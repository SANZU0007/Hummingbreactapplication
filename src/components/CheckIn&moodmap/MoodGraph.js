import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList
} from 'recharts';

// Define inline styles
const styles = {
    chartContainer: {
        backgroundColor: '#1e1e1e', // Dark background for better contrast
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Adding shadow for depth
    },
    title: {
        color: '#ffffff', // White text for title
        marginBottom: '16px',
        textAlign: 'center',
    },
    tooltip: {
        backgroundColor: '#333333',
        border: '1px solid #8884d8',
        borderRadius: '4px',
        padding: '8px',
    },
    labelText: {
        fontSize: '12px',
        fill: '#ffffff',
    },
    footer: {
        marginTop: '16px',
        color: '#ffffff',
        textAlign: 'center',
    },
};

const MoodGraph = ({ checkInData }) => {

    console.log(checkInData)

    // Prepare data for the graph, directly using mood values
    const graphData = checkInData.map((item) => {
        const date = new Date(item.checkIn);
        const formattedDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }); // Format date as MM/DD/YYYY
    
        return {
            name: formattedDate, // Set name to the formatted date
            mood: item.userMood || 0, // Use the mood value directly
        };
    });

    // Custom label component for displaying mood
    const CustomLabel = ({ x, y, value }) => (
        <g>
            <text x={x} y={y} dy={-6} textAnchor="middle" fill="#fff">
                {value} {/* Display the mood value directly */}
            </text>
        </g>
    );

    return (
        <div style={styles.chartContainer}>
            <h1 style={styles.title}>Mood Status Graph</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={graphData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
                    <XAxis 
                        dataKey="name" 
                        stroke="#ffffff" 
                        label={{ value: "Date", position: "insideBottomRight", offset: -5 }} // X-axis label
                    />
               <YAxis domain={[0, 100]} stroke="#ffffff" />

                    <Tooltip formatter={(value) => [`Mood: ${value}`]} contentStyle={{ backgroundColor: '#333', color: '#fff' }} /> {/* Format tooltip */}
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Bar dataKey="mood" fill="#00897b" barSize={30}>
                        <LabelList 
                            dataKey="mood" 
                            content={({ x, y, value }) => (
                                <CustomLabel 
                                    x={x} 
                                    y={y} 
                                    value={value} 
                                />
                            )}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div style={styles.footer}>
                <p>Total Mood Entries: {checkInData.length}</p> {/* Show total entries as a summary */}
            </div>
        </div>
    );
};

export default MoodGraph;
