import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import "./hrfeedback.css";
import ViewHrfeedback from './ViewHrfeedback';

export const HrfeedBack = () => {
  const [personId] = useState('user123'); // Default person ID, can be dynamic if needed
  const [message, setMessage] = useState('');
  const [messageStatus] = useState(true); // Assuming true for feedback
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar type

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFeedbackSubmit = async () => {
    const feedbackPayload = {
      personid: personId,
      message: message,
      messageStatus: messageStatus,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/feedback', feedbackPayload);
      setSnackbarMessage(`${response.data.message} posted successfully`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpen(false); // Close the dialog after successful submission
    } catch (error) {
      setSnackbarMessage('Please delete previous Message, or Pin the Message');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

 

  return (
    <div>
      <Button   style={{ textTransform: "none", backgroundColor: "#FFFFFF", color: "#002525",marginLeft:"3px" }} 
          variant="contained" onClick={handleOpen}>
        NoticeBoard 
      </Button>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>HR Feedback</DialogTitle>
        <DialogContent>
          <p>Please enter your feedback:</p>
          <input
            type="text"
            placeholder="Enter your feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" style={{ padding: '8px 16px', marginRight: '8px' }}>
            Cancel
          </Button>
          <Button onClick={handleFeedbackSubmit} variant="contained" color="primary" style={{ padding: '8px 16px' }}>
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HrfeedBack;
