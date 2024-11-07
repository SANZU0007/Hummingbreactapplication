import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import { useAuth } from "../utils/auth";
import "../styles/graphs.css";
import Calendar from "./Calendar";
import { apiUrl } from "../api";
import { Spinner } from "./Spinner";
import axios from "axios";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FLASH_SUCCESS, FLASH_ERROR } from "../constants/actionTypes";
import styled from "styled-components";
import Person from "@mui/icons-material/Person";
import Stressometer from "./Stressometer";
import Hrtaskpost from "./HrtodoList/Hrtaskpost";
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


 const UserID =  localStorage.getItem('user');

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
  const navigate = useNavigate();

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
    <div style={{  backgroundColor: "#002525", height: "90%", color: "white"  ,}}>
     
     <div  >
     

     <div style={{display:"flex" ,flexDirection:"column" ,textAlign:"start" ,alignItems:"flex-start" , marginLeft:"35px" ,marginRight:"25px"}}>
     <h1 className="header-name" >Hi {user.username || "Guest"} 👋</h1>

      <p>
        We're thrilled to see you again. Dive into your personalized dashboard
        to explore your recent achievements, upcoming goals, and insights into
        your engagement and well-being. Let's continue to grow and succeed
        together.
      </p>

      </div>

       <br></br>   <br></br>

       <div style={{marginLeft:"35px"}}>
      {/* <UserFresh/> */}

      <UserCheckInUsers />
     
     
     
      </div>

      <WishingUser/>

    
            <Todo />
    


      
      </div>
      {/* <UserCheckInUsers /> */}

      {/* <div className='graph-header'>
        <div className='graph-heading'>Hi {auth.loggedUser.name}!  <img style={{height:"45px", width:"45px", margin:"15px 0 0px 10px"}} src="../images/hand.png" /></div>
        <div className='graph-heading-para'>We're thrilled to see you again. Dive into your personalized dashboard to explore your recent <b>achievements, upcoming goal</b> and <b>insigts into your engagement and well-being.</b>Let's continue to grow and succeed together!</div>
      </div> */}


{/* <div className="metric-slack">
            <div className="metric-improve">
              <div className="metric-improve-heading">Improve your metrics</div>
              <div className="metric-improve-text">Select One</div>
              <div className="dropdown-container">
                <div className="dropdown-box">
                  <Link to="#" className="dropdown-link">
                    Positivity
                  </Link>
                  <div className="dropdown-content">
                    <Link to="/engagement" className="dropdown-link hoverable">
                      Engagement
                    </Link>
                    <Link
                      to="/relationship"
                      className="dropdown-link hoverable"
                    >
                      Relationship
                    </Link>
                    <Link to="/meaning" className="dropdown-link hoverable">
                      Meaning
                    </Link>
                  </div>
                </div>
              </div>
              <div className="metric-dummy-text">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus hac
                feugiat eros ridiculus at sagittis. Erat justo dapibus nullam
                senectus aptent vehicula vehicula. Dis inceptos rutrum lacinia
                dui scelerisque sapien ultrices volutpat
              </div>
            </div>
            <div className="google-slack">
              <div style={{ borderRight: "1px solid white" }}>
                Google Calendar{" "}
                <a href="https://calendar.google.com/">
                  <img
                    src="../images/google-calendar-new.svg"
                    className="google-slack-img"
                  />
                </a>
              </div>
              <div>
                Slack{" "}
                <a href="https://slack.com/">
                  <img
                    src="../images/slack-new.svg"
                    className="google-slack-img"
                  />
                </a>
              </div>
            </div>
          </div> */}


      <div className="graph-info">
        <div className="graph-info-upper">
          {/* <div className="graph-info-upper-first">
            <div className="mood">
              <div className="mood-ask">
                <div className="mood-ask-para">
                  <div className="mood-ask-title">How are you doing</div>
                  <div className="mood-ask-moodometer">mood-o-meter</div>
                </div>
              </div>
              <div className="slider-container">
                <div className="emojis">
                  <div className="emoji">😔</div>
                  <div className="emoji">🙂</div>
                  <div className="emoji">😃</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  className="slider"
                  onChange={handleChange}
                  style={{
                    background: `linear-gradient(to right, #008080 ${value}%, #d3d3d3 ${value}%)`,
                  }}
                />
              </div>
            </div>
            <div className="box-grid">
              {boxes.map((box, index) => (
                <div
                  key={index}
                  className={`box ${activeBox === index ? "active" : ""}`}
                  onClick={() => handleMood(index, box)}
                >
                  <div className="label">{box.label}</div>
                  <div className="description">{box.description}</div>
                </div>
              ))}
            </div>
          </div> */}
          {/* <div className="graph-info-upper-second">
            <div className="para">
              <div className="graph-container">
                {graphData.length ? (
                  graphData.map((item, index) => {
                    return (
                      <>
                        <div className="circle-container">
                          <CircularProgress value={item.value} />
                          <div className="circle-params">
                            {item.parameter
                              ? item.parameter.charAt(0).toUpperCase() +
                                item.parameter.slice(1)
                              : ""}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div> */}
        </div>
       



        <div  style={{display:"flex" ,justifyContent:"space-between"}}>
            <NoticeBoard />
            <Gratitudes />
          </div>
        <div></div>
      </div>
    </div>
  );
}



export default Graphs;
