import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import axios
import "../../styles/todo.css";
import { apiUrl } from '../../api';

const PostTodo = ({GetTodoList}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [eventVal, setEventVal] = useState({ task: '', priority: 'Low' });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  
  const handleDateChange = (date) => setStartDate(date);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventVal((prev) => ({ ...prev, [name]: value }));
  };


  const UserID = JSON.parse(localStorage.getItem("user"))

  console.log(`User ID: ${UserID}`);

  const handleAddTask = async () => {
    const taskData = {
      task: eventVal.task,
      date: startDate,
      priority: eventVal.priority,
      status: 'In Progress', // Default status
      duration: 45, // Default duration
      completedDuration: 0, // Default completed duration
      user: UserID._id , // Replace with actual user info
      role: 'Developer', // Replace with actual role info
      team:UserID.team,
      companyName:UserID.companyName
    };

    try {
      const response = await axios.post(`${apiUrl}/tasks/create`, taskData);
      console.log('Task added:', response.data);
      handleCloseDialog(); // Close the dialog after adding
      GetTodoList()
      setEventVal({ task: '', priority: 'Low' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <>
      <div className="todo-input flex mt-4" style={{ marginBottom: "25px" }}>
        <Fab 
          style={{ backgroundColor: "#01322a", color: "white" }}
          onClick={handleOpenDialog}
          aria-label="add task"
        >
          <AddIcon />
        </Fab>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}  
      
      fullWidth
     
      PaperProps={{
        style: {
          width: `${window.innerWidth}px`, // 90% of the window's width
          // height: `${window.innerHeight * 0.9}px`, // 90% of the window's height
         border:"2px solid #24554a"
        },
      }}
      
      >
        <DialogTitle 
          className='dialog-content'
          style={{ borderBottom: "1px solid white" }}
        >
          Add New Task
        </DialogTitle>
        
        <DialogContent className='dialog-content'>
          <br />
          {/* <div>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className="border border-gray-300 rounded w-full p-2"
            />
          </div> */}
          
          <div className="mb-2">
            <select
              onChange={handleChange}
              name="priority"
              value={eventVal.priority}
              className="border border-gray-300 rounded w-full p-2"
              style={{backgroundColor:"transparent" ,color:"#9B9B9B"}}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              value={eventVal.task}
              name="task"
              id="task"
              placeholder="Task"
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
        </DialogContent>
        
        <DialogActions   className='dialog-footer'>
          <Button
            variant="contained"
            style={{ textTransform: "none", backgroundColor: "#002525" }}
            onClick={handleCloseDialog}
            color="default"
          >
            Cancel
          </Button>
          
          <Button
            variant="contained"
            style={{ textTransform: "none", backgroundColor: "#002525" }}
            color="primary"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostTodo;
