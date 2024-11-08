import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/graphs.css";
import { apiUrl } from "../api";
import axios from "axios";
import Todo from "./Todo";
import { useDispatch } from "react-redux";
import { FLASH_SUCCESS, FLASH_ERROR } from "../constants/actionTypes";
import UserCheckInUsers from "./checkinusers/userCheckin";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import Gratitudes from "./Gratitude/Gratitude";
import UserFresh from "./checkinusers/UserFresh";
import WishingUser from "./checkinusers/WishingUser";

function Graphs() {
  const [graphData, setGraphData] = useState([{}]);

  const auth = useAuth();
  const [value, setValue] = useState(50);

  const [activeBox, setActiveBox] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);


  const UserID = localStorage.getItem('user');

  const [checkInOutTime, setCheckInOutTime] = useState({
    checkIn: "",
    checkOut: "",
    user: UserID._id
  });

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const boxes = [
    { label: "LOW", description: "UNDERLOAD" },
    { label: "MODERATE", description: "MANAGEABLE" },
    { label: "OPTIMUM", description: "GOOD SPOT" },
    { label: "TOO MUCH", description: "OVERLOAD" },
    { label: "HIGH", description: "BURNOUT" },
  ];

  const dispatch = useDispatch();

  const handleMood = async (index, box) => {
    setActiveBox(index);
    try {
      const moodData = {
        mood: box.label,
        date: new Date().toLocaleString("default", { month: "long" }),
        author: auth.loggedUser._id,
      };

      const { data } = await axios.post(`${apiUrl}/mood`, moodData, config);

      if (data.type === "success") {
        console.log("success");
        dispatch({ type: FLASH_SUCCESS, payload: data.message });
      } else {
        console.log("error", data.message);
        dispatch({ type: FLASH_ERROR, payload: data.message });
      }
    } catch (err) {
      dispatch({ type: FLASH_ERROR, payload: err.message });
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      date: "06 JULY",
      priority: "MEDIUM",
      task: "DESIGN A CARROUSEL, SM",
      completed: false,
    },
    {
      id: 2,
      date: "14 JULY",
      priority: "LOW",
      task: "ADVERTISEMENT DESIGN FOR INSTAGRAM",
      completed: false,
    },
    {
      id: 3,
      date: "28 JULY",
      priority: "HIGH",
      task: "DESIGN SOCIAL MEDIA POST",
      completed: false,
    },
  ]);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div style={{ backgroundColor: "#002525", height: "90%", color: "white", }}>

      <div  >


        <div style={{ display: "flex", flexDirection: "column", textAlign: "start", alignItems: "flex-start", marginLeft: "35px", marginRight: "25px" }}>
          <h1 className="header-name" >Hi {user.username || "Guest"} 👋</h1>

          <p>
            We're thrilled to see you again. Dive into your personalized dashboard
            to explore your recent achievements, upcoming goals, and insights into
            your engagement and well-being. Let's continue to grow and succeed
            together.
          </p>

        </div>

        <br></br>   <br></br>

        <div style={{ marginLeft: "35px" }}>

          <UserCheckInUsers />



        </div>

        <WishingUser />

        <Todo />
      </div>


      <div className="graph-info">
        <div className="graph-info-upper">
          
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NoticeBoard />
          <Gratitudes />
        </div>
      </div>
    </div>
  );
}



export default Graphs;
