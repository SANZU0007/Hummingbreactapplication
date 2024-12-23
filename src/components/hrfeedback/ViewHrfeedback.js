import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import { apiUrl } from '../../api';

const ViewHrfeedback = ({fetchNotices}) => {

  const [feedbackList, setFeedbackList] = useState([]);
  const [open, setOpen] = useState(false);

  // Function to fetch all feedback from the API
  const fetchAllFeedback = async () => {
    
    const User = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.get(`${apiUrl}/api/feedback/${User.companyName}`);
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

 

  // Function to open the dialog
  const handleOpenDialog = () => {
    fetchAllFeedback()
    setOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to toggle the pin status of feedback
  const togglePinFeedback = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the current status
      await axios.put(`${apiUrl}/api/feedback/${id}`, {
        messageStatus: newStatus,
      });
      fetchAllFeedback(); // Refresh the feedback list after updating
      fetchNotices()
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  // Function to delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/feedback/${id}`);
      fetchAllFeedback(); // Refresh the feedback list after deletion
      fetchNotices()
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <Button   style={{ textTransform: "none", backgroundColor: "#FFFFFF", color: "#002525" ,marginLeft:"3px" }} 
          variant="contained"  onClick={handleOpenDialog}>
        Edit
      </Button>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth
      
      PaperProps={{
        style: {
          
          color:"white",
          backgroundColor: "#002525",
        },
      }}
     
      >
        <DialogTitle>All Feedback Details</DialogTitle>
        <DialogContent>
          {feedbackList.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            <ul>
              {feedbackList.map((feedback) => (
                <li
                  key={feedback._id} // Use unique ID for key
                  style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                >
                  <IconButton
                    onClick={() => togglePinFeedback(feedback._id, feedback.messageStatus)}
                    color={feedback.messageStatus ? 'default' : 'primary'}
                  >
                    <PushPinIcon />
                  </IconButton>

                  <strong>Message:</strong> {feedback.message} &nbsp;

                  <IconButton
                    onClick={() => deleteFeedback(feedback._id)} // Call deleteFeedback on click
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewHrfeedback;
