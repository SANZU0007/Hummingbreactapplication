import React, { useEffect, useState } from "react";
import {
  Box,

  Checkbox,
 
  FormControlLabel,
  IconButton,

  Typography,
 
  Card,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";

import { useAuth } from "../utils/auth";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import styled from "styled-components";
import "../styles/todo.css";
import PostTodo from "./todo/PostTodo";
import Timer from "./todo/Timer";
import ChangeStatus from "./todo/ChangeStatus";
import { deleteAllGoals, EditAllGoals, fetchAllTask, fetchCurrentLoginUserTask } from "../ApiService/api";
import { fetchAllGoals } from "./ApiService/api";
import Hrtaskpost from "./HrtodoList/Hrtaskpost";

const DeleteButton = styled(IconButton)`
  color: #008080;
  &:hover {
    color: white;
  }
`;

function Todo({employees ,setEmployees}) {
  
  const auth = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);

  const [tasks ,setTasks] = useState([])

  const UserID = JSON.parse(localStorage.getItem("user"))

  console.log(`User ID: ${UserID}`);

console.log(tasks);

  const GetTodoList = async () => {
    try {
      const response = await fetchCurrentLoginUserTask(UserID._id);
      setTasks(response);
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  useEffect(()=>{
    GetTodoList()
  },[])




  const completedTasksCount = tasks.filter(task => task.status === "Completed").length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;


  const handleUpdateFunction = async (goal) => {
    const updatedGoal = {
      ...goal, // Spread goal properties to maintain existing values
      status: "Completed", // Toggle status between Paused and In Progress
    };

    try {
      // Call the API to update the goal status
      await EditAllGoals(goal._id, updatedGoal); // Ensure the correct ID and updated data is sent
      console.log("Goal updated successfully");
      GetTodoList()
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };




  const handleDeleteFunction = async (goal) => {
  
    try {
      // Call the API to update the goal status
      await deleteAllGoals(goal._id); // Ensure the correct ID and updated data is sent
      console.log("Delete updated successfully");
      GetTodoList()
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };










  return (
    <div className="todo-list">

     
      <div className="todo-header">
         <div style={{marginTop:"25px"}}>
         <Typography variant="h4" style={{textAlign:"start"}}> Daily Goals </Typography>
         <div style={{display:"flex" ,textAlign:"center" ,alignItems:"center" ,gap:"20px" ,marginTop:"10px"}}>
         <Typography variant="h4" style={{textAlign:"start" ,color:"#007A70"}}> {completionPercentage}% </Typography>
         <p style={{textAlign:"start"}}> successfully Completed</p>
         
         </div>
        </div>

        {(UserID.role === "TL" || UserID.role === "Administrator") && (
   <Hrtaskpost employees={employees} setEmployees={setEmployees}/>
)}


        



        <PostTodo GetTodoList={GetTodoList} />
      </div>

      {tasks && tasks.length === 0 && (
        <Card className="no-task-card">Please Create Your Task</Card>
      )}
      {tasks &&
        tasks
          .slice()
          .reverse()
          .map((task) => (
            <div
              style={{
                backgroundColor:
                  task.status === "Completed" ? "white" : "transparent",
                color: task.status === "Completed" ? "black" : "white",
              }}
              className="Main-container"
              key={task._id}
            >
              <div className="text-container">
                <div className="flag">
                  <BookmarkIcon className={task.priority} />
                  <Typography variant="body1" ml={1} className="task-text">
                    {task.task}
                  </Typography>
                </div>

                <Timer goal={task} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className={
                    task.status == "In Progress" ? "In-Progress" : task.status
                  }
                >
                  {task.status}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Box className="task-actions">
                    {task.role !== "Admin" ? (
                      <AccountCircleIcon
                        className={`task-role-icon ${
                          task.status === "Completed"
                            ? "completed-icon"
                            : "pending-icon"
                        }`}
                      />
                    ) : (
                      <FontDownloadIcon
                        className={`task-role-icon ${
                          task.status === "Completed"
                            ? "completed-icon"
                            : "pending-icon"
                        }`}
                      />
                    )}
                  </Box>

                  <DeleteButton onClick={()=>{handleDeleteFunction(task)}}>
                    <DeleteIcon
                      className={`delete-icon ${
                        task.status === "Completed"
                          ? "completed-icon"
                          : "pending-icon"
                      }`}
                    />
                  </DeleteButton>
                  {task.status !== "Completed" && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "white" }}
                          className="task-checkbox"
                          checked={task.status === "Completed"}
                          onChange={() => handleUpdateFunction(task)}
                        />
                      }
                    />
                  )}
                </div>
              </div>

              <ChangeStatus

GetTodoList={ GetTodoList}
                // getData={() => dispatch(getTasks(auth.loggedUser._id))}
                goal={task}
              />
            </div>
          ))}
    </div>
  );
}

export default Todo;
