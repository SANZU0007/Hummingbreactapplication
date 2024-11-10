import React, { useEffect, useState } from 'react';

import SurveyAnswerForm from './SurveyAnswerForm';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import './style/survey.css';

import { fetchAllSurveys } from '../ApiService/api';

const Survey = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState(null); // State to store the selected survey

  const navigate = useNavigate();

  // Retrieve user details from localStorage safely
  let userDetails = null;
  try {
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
  } catch (err) {
    console.error("Error parsing user details from localStorage", err);
  }

  // Check if userDetails is valid and if the role is admin
  const isAdmin = userDetails && userDetails.role === 'admin'; // Determine if user is admin

  // Corrected handleNavigate function
  const handleNavigate = (survey) => {
    // Store the selected survey ID in localStorage
    localStorage.setItem('navigate', survey._id);
    // Navigate to the Response page
    navigate('/Response');
  };

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const data = await fetchAllSurveys();
        setSurveys(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSurveys();
  }, []);

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
  };

  return (
    <>
    {/* <Navbar/> */}
    
    <div style={{height:"100vh" ,overflow:"auto"}}>
      <h1 style={{color:"white"}} >
        Surveys
      </h1>

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          Error: {error}
        </Alert>
      )}

      {selectedSurvey ? (
        <SurveyAnswerForm
          selectedSurvey={selectedSurvey}
          setSelectedSurvey={setSelectedSurvey}
        />
      ) : (
        <div  className="survey-list">
          {surveys.length > 0 ? (
            <div >
              {surveys.map((survey) => (
                <div key={survey._id} className="survey-item">
                  <ListItemText
                    primary={<Typography variant="h6">{survey.title}</Typography>}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSurveyClick(survey)}
                    style={{ marginRight: '10px',textTransform:"none" }}
                  >
                    Fill The Survey
                  </Button>
                  {isAdmin && ( // Only show button if user is admin
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleNavigate(survey)}
                    >
                      Survey Response
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body1" align="center" className="no-surveys-message">
              No surveys found.
            </Typography>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default Survey;
