import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Notice.css";
import { apiUrl } from '../../api';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import HrfeedBack from '../hrfeedback/HrfeedBack';
import ViewHrfeedback from '../hrfeedback/ViewHrfeedback';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  // Function to fetch all notices from the API
  const fetchNotices = async () => {
    const User = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(`${apiUrl}/api/feedback/${User.companyName}`);
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  // Effect to fetch notices when the component mounts
  useEffect(() => {
    fetchNotices();
  }, []);


  const user = JSON.parse(localStorage.getItem('user'));


  return (
  
      <div className="notice-board">

       
        <div className='top-div'>

        <h4  className="notice-title">
          Notice Board
        </h4>

        { }
        <div style={{display:"flex"}}>

          {
          (user.role == "HR" || user.role == "Administrator" )&&(
            <>
              <HrfeedBack fetchNotices={fetchNotices} />
              <ViewHrfeedback fetchNotices={fetchNotices} />
            </>
          )
          }

      

        </div>

        </div>

        <List className="notice-list">
          {notices.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notices available." />
            </ListItem>
          ) : (
            notices.map((notice) => (
              <div key={notice._id}>
                <ListItem className="notice-item">
                
                  {!notice.messageStatus && (
                    <IconButton
                  
                      color="primary"
                    >
                      <PushPinIcon />
                    </IconButton>
                  )}
                  <ListItemText 
                    primary={notice.message} 
                    className="notice-message" 
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          )}
        </List>
      </div>
 
  );
};

export default NoticeBoard;
