import React, { useEffect, useState } from 'react';
import "./info.css";
import Typography from '@mui/material/Typography'; // Import Typography for better text styling
import PeopleIcon from '@mui/icons-material/People'; // Icon for Employees
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icon for On Time
import CancelIcon from '@mui/icons-material/Cancel'; // Icon for Absent
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Icon for Leave
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'; // Icon for Sick Leave
import EventNoteIcon from '@mui/icons-material/EventNote'; // Icon for Casual Leave
import { fetchNormalUser, TodayLoginUsers } from '../../ApiService/api';

const Info = ({ employees}) => {




  const [checkIn, setCheckInData] = useState([]);



  // console.log(user.length - checkIn.length)
  const [earlyDispatchCount, setEarlyDispatchCount] = useState(0);
  const [lateArrivalCount, setLateArrivalCount] = useState(0);
  const [onTimeCount, setOnTimeCount] = useState(0); // State for On Time count

  const fetchTodayLogin = async () => {
    try {
      const response = await TodayLoginUsers();
      setCheckInData(response);
      
      // Calculate counts for earlyDispatch, lateArrival, and onTime
      const earlyDispatch = response.filter(item => item.earlyDispatch).length;
      const lateArrival = response.filter(item => item.lateArrival).length;
      const onTime = response.filter(item => !item.earlyDispatch && !item.lateArrival).length;

      setEarlyDispatchCount(earlyDispatch);
      setLateArrivalCount(lateArrival);
      setOnTimeCount(onTime); // Update On Time count
    } catch (error) {
      console.error("Failed to fetch today login user data:", error);
    }
  };

  useEffect(() => {
    fetchTodayLogin();
 
  }, []);

  return (
    <div className="info-section">
      <div className="card-group">
        <div className="stat-card">
          <div className="card-content">
            <h1>{employees.length}</h1>
            <Typography variant="body1">Employees</Typography>
          </div>
          <PeopleIcon fontSize="large" />
        </div>
        <div className="stat-card">
          <div className="card-content">
            <h1>{onTimeCount}</h1> {/* Display On Time count here */}
            <Typography variant="body1">On Time</Typography>
          </div>
          <AccessTimeIcon fontSize="large" />
        </div>
        <div className="stat-card">
          <div className="card-content">
            <h1>{employees.length - checkIn.length}</h1>
            <Typography variant="body1">Absent</Typography>
          </div>
          <CancelIcon fontSize="large" />
        </div>
      </div>

      <div className="card-group">
        <div className="stat-card">
          <div className="card-content">
            <h1>{earlyDispatchCount}</h1>
            <Typography variant="body1">Early Departures</Typography>
          </div>
          <EventAvailableIcon fontSize="large" />
        </div>
        <div className="stat-card">
          <div className="card-content">
            <h1>{lateArrivalCount}</h1>
            <Typography variant="body1">Late Arrival</Typography>
          </div>
          <HealthAndSafetyIcon fontSize="large" />
        </div>
        <div className="stat-card">
          <div className="card-content">
            <h1>1</h1>
            <Typography variant="body1">Casual Leave</Typography>
          </div>
          <EventNoteIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Info;
