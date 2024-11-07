import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Alert, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './sent.css'; // Ensure this CSS file exists
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const Sent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current message index

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/messages/sending/${user._id}`);
        setSentMessages(response.data);
      } catch (error) {
        console.error("Error fetching sent messages:", error);
        setError('Failed to load sent messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSentMessages();
  }, [user._id]);

  const handleNext = () => {
    if (currentIndex < sentMessages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="sent-container">
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      
      {sentMessages.length > 0 ? (
        <div className="rececive-messages-list">
           <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
              <NavigateBefore style={{ color: "#008080" }} />
            </IconButton>
          <div className="message-item sent">
            <div className="message-header">
            <p className='mes-p-tag-1'>{sentMessages[currentIndex].message}</p>
            
            </div>
            <div className="message-content">
            <p className='mes-p-tag-2'>@{sentMessages[currentIndex].receivingUserName}</p>
            </div>
          </div>
       
           
            <IconButton onClick={handleNext} disabled={currentIndex === sentMessages.length - 1}>
              <NavigateNext style={{ color: "#008080" }} />
            </IconButton>
       
        </div>
      ) : !loading ? (
        <p>No messages sent.</p>
      ) : null}
    </div>
  );
}

export default Sent;
