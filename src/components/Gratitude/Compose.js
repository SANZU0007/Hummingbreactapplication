import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { Alert, CircularProgress } from '@mui/material';
import "./compose.css"

const Compose = () => {
  // State variables to hold user inputs and UI state
  const [sendingUserName, setSendingUserName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ severity: '', message: '' });

  // Context for user details
  const { userDetails } = useContext(UserContext);

  
  const user = JSON.parse(localStorage.getItem('user'));


  console.log(user)

  // Function to handle sending the message
  const sendMessage = async () => {
    const payload = {
      sendingId: user._id, // Replace with a dynamic value if needed
      message,
      receivingId: selectedEmployeeId, // Use selected employee ID for the receiving ID
      receivingUserName: userDetails.find(emp => emp._id === selectedEmployeeId)?.name || "Unknown", // Get selected employee's name
      sendingUserName: user.name
    };

    setLoading(true); // Set loading state to true
    setAlert({ severity: '', message: '' }); // Reset alert

    try {
      const response = await axios.post("https://adminuserwebapi.onrender.com/api/messages/", payload);
      console.log("Message sent:", response.data);
      
      // Clear the input fields after sending the message
      setSendingUserName('');
      setMessage('');
      setSelectedEmployeeId(''); // Clear the selected employee

      // Set success alert
      setAlert({ severity: 'success', message: 'Message sent successfully!' });
    } catch (error) {
      console.error("Error sending message:", error);
      // Set error alert
      setAlert({ severity: 'error', message: 'Error sending message. Please try again.' });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handler for employee selection change
  const handleSelectChange = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  return (
    <div className="compose-container">
      {alert.message && (
        <Alert severity={alert.severity} style={{ marginBottom: '16px' }}>
          {alert.message}
        </Alert>
      )}
      <div className="input-group">
        <label className="input-label">
      
          <select 
            style={{backgroundColor: "transparent" ,color:"white"}} 
            value={selectedEmployeeId} 
            onChange={handleSelectChange} 
            className="select-employee"
          >
            <option    value="">-- Select Employee --</option>
            {userDetails.map((employee) => (
              <option 
              style={{backgroundColor: "transparent" ,color:"black"}}
              key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </label>
      </div>
     
      <div className="input-group">
        <label className="input-label">
        
          <textarea 
            className="textarea-field" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type your message here" 
          />
        </label>
      </div>
      <button 
      
       style={{backgroundColor:"#008080"}}
      
      className="send-button" onClick={sendMessage} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Send Message'}
      </button>
    </div>
  );
}

export default Compose;
