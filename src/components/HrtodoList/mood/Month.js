import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Month = ({ checkIns }) => {
  // Function to calculate the average mood for the given month data
  const calculateAverageMood = (records) => {
    const totalMood = records.reduce((acc, record) => {
      return acc + (record.userMood || 0); // Add userMood, defaulting to 0 if not present
    }, 0);

    const moodCount = records.filter(record => record.userMood !== undefined).length;
    return moodCount > 0 ? (totalMood / moodCount).toFixed(2) : 0;
  };

  // Prepare the data for the Recharts component
  const chartData = checkIns.map((monthData) => {
    const { year, month } = monthData._id;
    const averageMood = parseFloat(calculateAverageMood(monthData.records));
    return {
      name: `${year}-${month.toString().padStart(2, '0')}`, // Format as "Year-Month"
      averageMood
    };
  });

  return (
    <div>
        <br></br>
      <h1 style={{color:"white"}}>Monthly Average Mood</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} /> {/* Set Y-axis range from 0 to 100 */}
          <Tooltip />
          <Legend />
          <Bar dataKey="averageMood" fill="#00897b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Month;
