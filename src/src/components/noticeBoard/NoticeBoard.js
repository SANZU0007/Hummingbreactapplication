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

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  // Function to fetch all notices from the API
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/feedback`);
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  // Effect to fetch notices when the component mounts
  useEffect(() => {
    fetchNotices();
  }, []);



  return (
  
      <div className="notice-board">

       
        <div className='top-div'>

        <h4  className="notice-title">
          Notice Board
        </h4>
        <h4  className="notice-title2">
          View All
        </h4>

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
