import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createTask } from '../../actions/todo';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import Alert from '@mui/material/Alert'; // Import Alert
import "./hrtask.css";
import { useAuth } from '../../utils/auth';
import { apiUrl } from '../../api';
import TLDashAttendance from '../TLcomponnents/TlDashAttendance';
import { RemoveRedEyeRounded } from '@mui/icons-material';
import { Tooltip } from 'recharts';

const Hrtaskpost = ({ employees, setEmployees }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [validationError, setValidationError] = useState(''); // State to handle validation errors
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for success alert

  const auth = useAuth();

  const [eventVal, setEventVal] = useState({
    date: new Date(),
    priority: "Low",
    task: "",
    completedDuration: 0,
    completed: false,
    author: auth?.loggedUser?._id || null,
    role: 'Admin',
    team:JSON.parse(localStorage.getItem('user')).team
  });

  const [openDialog, setOpenDialog] = useState(false); // State to control dialog box


  const [openDialogTask, setOpenDialogTask] = useState(false); // State to control dialog box

  // Fetch employee details
  useEffect(() => {
    // const fetchEmployees = async () => {
    //   try {
    //     const response = await axios.get(`${apiUrl}/api/employees`);
    //     setEmployees(response.data.filter((x)=>{
    //       return x.team == "Development"
    //     }));
    //     setLoading(false);
    //   } catch (err) {
    //     console.error('Error fetching employees:', err);
    //     setError('Failed to load employee data');
    //     setLoading(false);
    //   }
    // };
    // fetchEmployees();
        setLoading(false);
        console.log("HRTasjpost");
        console.log(employees);
  }, []);

  const handleSelectChange = (event) => {
    const employeeId = event.target.value;
    setSelectedEmployeeId(employeeId);
    setEventVal((prevState) => ({
      ...prevState,
      user: employeeId,
    }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setEventVal((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    // Validation logic
    if (!selectedEmployeeId) {
      setValidationError("Please select an employee.");
      return;
    }
    if (!eventVal.task) {
      setValidationError("Please enter a task.");
      return;
    }

    // Clear validation error and dispatch action if all fields are valid
    setValidationError('');
    dispatch(createTask(eventVal)); // Dispatch the createTask action

    // Show success alert
    setOpenSnackbar(true);

    handleCloseDialog(); // Close the dialog after adding the task
  };

  const handleOpenDialog = () => {
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  if (loading) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'white' }}>{error}</div>;
  }



  const handleCloseTask = () => setOpenDialogTask(false)
  const handleopenTask = () => setOpenDialogTask(true)

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      
        <Button 
          style={{ textTransform: "none", backgroundColor: "#FFFFFF", color: "#002525" ,marginTop:"5px" }} 
          variant="contained" 
          color="primary" 
          onClick={handleOpenDialog}
        >
          Add Goals for TeamMates
        </Button>
       
     
     
        <RemoveRedEyeRounded fontSize='large' titleAccess='View All TeamMate Goals' 
        style={{marginLeft:"10px"}}
         onClick={handleopenTask}/>
   
       

        <Dialog 
        
        fullWidth="lg"
        maxWidth='lg'
   
        
        
        open={openDialogTask} onClose={handleCloseTask}>
          <DialogTitle className='dialog-title'>TeamMates Task</DialogTitle>

          <TLDashAttendance employees={employees} setEmployees={setEmployees}/>
        
         
        </Dialog>







        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle className='dialog-title'>Add Task</DialogTitle>
          <DialogContent className='dialog-content'>
            {validationError && <p style={{ color: 'red' }}>{validationError}</p>} {/* Display validation errors */}
            <div className="todo-list-row">
              <select 
                value={selectedEmployeeId} 
                onChange={handleSelectChange} 
                className="select-employee"
              >
                <option value="">-- Select Employee --</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              {/* <div className="pick-date">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  className="date-picker"
                />
              </div> */}
              <select 
                onChange={handleChange} 
                value={eventVal.priority} 
                name="priority" 
                className="pick-priority" 
                id="priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                onChange={handleChange}
                value={eventVal.task}
                name="task"
                id="task"
                className="pick-task"
                placeholder="Enter Task"
              />
            </div>
          </DialogContent>
          <DialogActions className='dialog-footer'>
            <Button 
              style={{ textTransform: "none", backgroundColor: "#001212" }}
              variant='contained' 
              onClick={handleCloseDialog} 
              className="dialog-cancel-btn"
            >
              Cancel
            </Button>
            <Button 
              style={{ textTransform: "none", backgroundColor: "#001212" }}
              variant='contained' 
              onClick={handleAddTask} 
              className="dialog-add-btn"
            >
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Success Snackbar */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          The task was successfully assigned to the user!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Hrtaskpost;
