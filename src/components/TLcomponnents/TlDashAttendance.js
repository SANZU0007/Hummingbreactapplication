import React from "react";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { apiUrl } from "../../api";
// import '../styles/hrdashboard.css'
import { useDispatch } from "react-redux";
import { FLASH_SUCCESS, FLASH_ERROR } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { fetchAllTask } from "../../ApiService/api";
import "react-datepicker/dist/react-datepicker.css";
import Hrtaskpost from "../HrtodoList/Hrtaskpost";
import { DataGrid } from "@mui/x-data-grid";

function TLDashAttendance({ employees, setEmployees }) {

 



  const auth = useAuth();
  const userId = auth.loggedUser?._id || null;


console.log(employees);



const User = JSON.parse(localStorage.getItem('user'));



  const [tasks, setTasks] = useState([]);

  console.log(tasks)

  const getAllTasks = async () => {
    const response = await fetchAllTask(User.companyName);

    const formattedData = response.tasks.map(item => {
      const matchedEmployee = employees.find(emp => emp._id === item.user);

      return {
          ...item,
          employeeName: matchedEmployee ? matchedEmployee.name : 'Unknown',
         
      };
  });


    setTasks(formattedData.filter((tasks) => tasks.team == User.team));
  };

  const columns = [
    { field: "employeeName", headerName: "TL ID", width: 240 },
    { field: "date", headerName: "Date", width: 110 },
    { field: "task", headerName: "Task", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
  ];

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <div className="dashboard-container">
       

        <div className="view-tasks">
         
          <DataGrid
            style={{ color: "white" }}
            rows={tasks.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            initialState={{
  
              pagination: { paginationModel: { pageSize: 5 } }, // Set initial page size to 5
            }}
            pageSizeOptions={[5, 10,]} // Include "All" option
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "black",
                color: "black",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "#1e1e1e",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#333",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "black",
                color: "white",
              },
              "& .MuiTablePagination-root": {
                color: "white",
              },
            }}
          />
          <br /> <br />
        </div>
      </div>
    </>
  );
}

export default TLDashAttendance;
