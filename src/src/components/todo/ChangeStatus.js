import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/Pause';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { IconButton } from '@mui/material';

import { EditAllGoals } from '../ApiService/api'; // Import your API function

const ChangeStatus = ({ goal ,GetTodoList}) => {


  const handleUpdateFunction = async () => {
    const updatedGoal = {
      ...goal, // Spread goal properties to maintain existing values
      status: goal.status === "Paused" ? "In Progress" : "Paused", // Toggle status between Paused and In Progress
    };

    try {
      // Call the API to update the goal status
      await EditAllGoals(goal._id, updatedGoal); // Ensure the correct ID and updated data is sent
      console.log('Goal updated successfully');
      GetTodoList()
   
    } catch (err) {
      console.error('Error updating goal:', err);
    }
  };

  return (
    <div className="goal-icons">
      {goal.status === 'Paused' && (
        <IconButton onClick={handleUpdateFunction}>
          <PlayCircleOutlineIcon  style={{ color: "white" ,fontSize:"40px" }} />
        </IconButton>
      )}
      {goal.status === 'In Progress' && (
        <IconButton onClick={handleUpdateFunction}>
          <PauseIcon style={{ color: "white",fontSize:"40px" }} />
        </IconButton>
      )}
      {goal.status === 'Completed' && (
        <IconButton color="success">
          <TaskAltIcon  style={{ fontSize:"40px" }}/>
        </IconButton>
      )}
    </div>
  );
}

export default ChangeStatus;
