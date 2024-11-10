import React, { useState } from "react";

import "../styles/graphs.css";
import { apiUrl } from "../api";
import axios from "axios";
import Todo from "./Todo";

import UserCheckInUsers from "./checkinusers/userCheckin";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import Gratitudes from "./Gratitude/Gratitude";
import UserFresh from "./checkinusers/UserFresh";
import WishingUser from "./checkinusers/WishingUser";

function Graphs({activeComponent, loadComponent}) {
  const UserID = localStorage.getItem('user');

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

          <UserCheckInUsers activeComponent={activeComponent} loadComponent={loadComponent}  />



        </div>

        <WishingUser activeComponent={activeComponent} loadComponent={loadComponent}   />

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
