import { Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { EditAllGoals } from '../ApiService/api';

const Timer = ({ goal ,getData }) => {
  // Initialize elapsedSeconds with goal.completedDuration to continue from saved data
  const [elapsedSeconds, setElapsedSeconds] = useState(goal.completedDuration || 0);
  const [isRunning, setIsRunning] = useState(goal.status === 'In Progress'); // Run only if status is "In Progress"

  // Helper function to format seconds into hh:mm:ss
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to save the current completedDuration to the API
  const handleUpdateFunction = async () => {


    const updatedGoal = {
      ...goal, // Spread goal properties to maintain existing values
      completedDuration: elapsedSeconds, // Save current elapsedSeconds as completedDuration
    };
 
    try {
      await EditAllGoals(goal._id, updatedGoal); // Update the goal using API
      console.log('Goal updated successfully');
      getData()
    } catch (err) {
      console.error('Error updating goal:', err);
    }
  };


  useEffect(()=>{
    handleUpdateFunction()
  },[goal.status])


  // Effect to handle the timer running
  useEffect(() => {
    // Stop the timer when elapsedSeconds reaches goal.duration (in minutes converted to seconds)
    if (elapsedSeconds >= goal.duration * 60) {
      setIsRunning(false); // Stop the timer when the goal is completed
      return;
    }

    // Only run the timer if it's running and goal.status is "In Progress"
    if (isRunning && goal.status === 'In Progress') {
      const timerInterval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1); // Increment by 1 second
      }, 1000); // 1 second interval

      // Cleanup the interval when the component unmounts
      return () => clearInterval(timerInterval);
    }
  }, [elapsedSeconds, goal.duration, isRunning, goal.status]);

  // Resume the timer when the page loads again if the status is "In Progress"
  useEffect(() => {
    if (goal.status === 'In Progress' && elapsedSeconds < goal.duration * 60 && !isRunning) {
      setIsRunning(true); // Resume the timer
    }
  }, [elapsedSeconds, goal.duration, isRunning, goal.status]);

  return (
    <>
      <Typography style={{fontSize:"12px"}} className="goal-duration">
        {formatTime(elapsedSeconds)} / {formatTime(goal.duration * 60)} {/* Format goal duration in hh:mm:ss */}
      </Typography>
     
    </>
  );
};

export default Timer;