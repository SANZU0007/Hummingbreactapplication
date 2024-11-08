import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Alert, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './receive.css'; // Optional: Create this CSS file for styling
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const Receive = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track current message index

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/messages/receiving/${user._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user._id]);

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="receive-container">
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      
     

      {messages.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="messages-list">
         
         
         
          <div className="message-container">

          <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
        <NavigateBefore style={{color:"#008080"}}  />
      </IconButton>
            <div className='message-text' >
             
              <p className='mes-p-tag-1'>{messages[currentIndex].message}</p>
              <p className='mes-p-tag-2'>@{messages[currentIndex].sendingUserName}</p>
            </div>
           
            <IconButton onClick={handleNext} disabled={currentIndex === messages.length - 1}>
        <NavigateNext style={{color:"#008080"}} />
      </IconButton>
          </div>
        </div>
      ) : !loading ? (
        <p>No messages received.</p>
      ) : null}

    
    </div>
  );
}

export default Receive;
