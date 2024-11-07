import React, { useEffect, useState } from 'react';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'; // Happy
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'; // Neutral
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined'; // Sad
import { Slider } from '@mui/material';
import axios from 'axios';

const UserFresh = ({ checkInData, employeeId,  }) => {


  const [mood , setMood]=useState(null)


  const fetchCheckInByUser = async () => {

    try {
      const response = await axios.get(
        `http://localhost:4000/api/attendance/checkin/${employeeId}`
      );
      console.log(response.data.userMood); // Log response data for debugging
      setMood(response.data.userMood);
  
    } catch (error) {
      
      console.log(error.message);
     
    } 
  };



useEffect(()=>{
  fetchCheckInByUser()
},[])





  const handleMoodChange = (event, newValue) => {
    // Only allow changing the mood if checkInData.userMood is null
    if (mood !== null) {
      return;
    }
    setMood(newValue);
  };

  const handleMoodChangeCommitted = async (event, newValue) => {
    
      try {
        await axios.put("http://localhost:4000/api/attendance/update-mood", {
          employeeId,
          mood: newValue,
        });

        fetchCheckInByUser();
      } catch (error) {
        console.error("Check-in error:", error);
      }
 
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "500px" }}>
      <p style={{ marginRight: '20px' }}>How Are You Doing?</p>
      <div style={{ position: 'relative', display: "flex", alignItems: "center", flexGrow: 1 }}>
        {/* Sad Icon at Start */}
        <div style={{ position: 'absolute', left: '0%', top: '-20px', transform: 'translateX(-10%)', zIndex: 1 }}>
          <MoodBadOutlinedIcon
            style={{
              backgroundColor: "#008080",
              color: "white",
              fontSize: "25px",
              borderRadius: "15px"
            }}
            fontSize="small"
          />
        </div>

        {/* Neutral Icon in the Middle */}
        <div style={{ position: 'absolute', left: '50%', top: '-20px', transform: 'translateX(-280%)', zIndex: 1 }}>
          <SentimentSatisfiedOutlinedIcon
            style={{
              backgroundColor: "#008080",
              color: "white",
              fontSize: "25px",
              borderRadius: "15px"
            }}
            fontSize="small"
          />
        </div>

        {/* Happy Icon at End */}
        <div style={{ position: 'absolute', left: '100%', top: '-20px', transform: 'translateX(-600%)', zIndex: 1 }}>
          <InsertEmoticonOutlinedIcon
            style={{
              backgroundColor: "#008080",
              color: "white",
              fontSize: "25px",
              borderRadius: "15px"
            }}
            fontSize="small"
          />
        </div>

        {/* Slider */}
        <Slider
          value={mood}
          onChange={handleMoodChange}
          onChangeCommitted={handleMoodChangeCommitted} // Trigger API call on mouse key up
          aria-labelledby="mood-slider"
          min={0}
          max={100}
          style={{ width: "200px", color: "#008080" }}
        />
        <p style={{ marginLeft: '20px' }}>{`${mood  == null ? 0 : mood}`}</p>
      </div>
    </div>
  );
};

export default UserFresh;
