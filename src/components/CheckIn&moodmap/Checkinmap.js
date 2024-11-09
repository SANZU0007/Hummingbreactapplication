import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoodGraph from './MoodGraph';
import { apiUrl } from '../../api';

const CheckInMap = () => {
  const [checkInData, setCheckInData] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCheckInData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/attendance/singleUser/${user._id}`);
        setCheckInData(response.data);
      } catch (err) {
        console.error("Error fetching check-in data:", err);
        setError("Failed to fetch check-in data.");
      }
    };

    fetchCheckInData();
  }, [user._id]);

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'checkInTime', headerName: 'Check-in Time', width: 150 },
    { field: 'checkOutTime', headerName: 'Check-out Time', width: 150 },
    { field: 'mood', headerName: 'Mood', width: 130 },
    { field: 'checkedIn', headerName: 'Checked In', width: 120 },
    { field: 'checkedOut', headerName: 'Checked Out', width: 120 },
    { field: 'earlyDispatch', headerName: 'Early Departures', width: 130 },
    { field: 'lateArrival', headerName: 'Late Arrival', width: 120 },
  ];

  // Format data for DataGrid
  const rows = checkInData.map(checkIn => ({
    id: checkIn._id,
    date: new Date(checkIn.checkIn).toLocaleDateString(),
    checkInTime: new Date(checkIn.checkIn).toLocaleTimeString(),
    checkOutTime: checkIn.checkOut ? new Date(checkIn.checkOut).toLocaleTimeString() : "Not yet checked out",
    mood: checkIn.userMood !== null ? checkIn.userMood : "No mood recorded",
    checkedIn: checkIn.isCheckedIn ? "Yes" : "No",
    checkedOut: checkIn.isCheckedOut ? "Yes" : "No",
    earlyDispatch: checkIn.earlyDispatch ? "Yes" : "No",
    lateArrival: checkIn.lateArrival ? "Yes" : "No",
  }));

  return (
    <Container style={{color:"white"}}>
      <Typography variant="h4" gutterBottom>
        Check-In Details
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : checkInData.length > 0 ? (
        <div >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
        
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'black',
                color: 'black',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: '#1e1e1e',
                color: 'white',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#333',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: 'black',
                color: 'white',
              },
              '& .MuiTablePagination-root': {
                color: 'white',
              },
            }}
          />
        </div>
      ) : (
        <Typography>No check-in records found for this user.</Typography>
      )}

      <br></br>  <br></br>

      <MoodGraph checkInData={checkInData}/>
    </Container>
  );
};

export default CheckInMap;
