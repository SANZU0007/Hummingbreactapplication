import React, { useState } from 'react';
import axios from 'axios';
import {
  Snackbar,
  Alert,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'; // Import Material-UI components
import "./style/surveyanswer.css";

const SurveyAnswerForm = ({ selectedSurvey, setSelectedSurvey, userId }) => {
  const [answers, setAnswers] = useState({});
  const [openAlert, setOpenAlert] = useState(false); // State for Snackbar visibility

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    try {
      const surveyResponse = {
        Title: selectedSurvey.title,
        userId: 1, // Use the user ID passed as a prop
        surveyId: selectedSurvey._id,
        username: user ? user.username : 'Unknown User',
        questions: selectedSurvey.questions.map((q) => ({
          questionId: q.questionId,
          text: q.text,
          answer: answers[q.questionId],
        })),
      };

      // Send the data using axios
      const response = await axios.post('http://localhost:4000/api/answers', surveyResponse);
      console.log('Survey response submitted successfully:', response.data);
      
      // Show alert on success
      setOpenAlert(true);
      
      // Reset the form or navigate back to survey list
      setTimeout(() => {
        setSelectedSurvey(null);
      }, 3000);
     
    } catch (error) {
      console.error('Error submitting survey response:', error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); // Close the alert
  };

  // Check if all questions are answered
  const allQuestionsAnswered = selectedSurvey.questions.every(q => answers[q.questionId] !== undefined);

  return (
    <div className='survey-container-file' >
      <h1> Survey Name : {selectedSurvey.title}</h1>
      <br />
      <ul className="question-list-file">
        {selectedSurvey.questions.map((q, index) => (
          <div key={`${q.questionId}-${index}`} >
            <p style={{fontSize:"28px"}}>{index + 1}. {q.text}</p>
            <p>{q.questionType}</p>

            {q.questionType === 'checkbox' && (
              <FormControl component="fieldset">
                <RadioGroup
                  style={{color: 'white'}}
                  name={`question-${q.questionId}`}
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
                  row
                >
                  {Array.from({ length: 11 }, (_, idx) => (
                    <FormControlLabel
                      style={{color: 'white'}}
                      key={idx}
                      control={<Radio style={{color: 'white'}} />}
                      label={idx}
                      value={idx}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {q.questionType === 'Boolean' && (
              <FormControl component="fieldset">
                <RadioGroup
                  style={{color: 'white'}}
                  name={`question-${q.questionId}`}
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
                  row
                >
                  <FormControlLabel
                    style={{color: 'white'}}
                    control={<Radio style={{color: 'white'}} />}
                    label="Yes"
                    value="Yes"
                  />
                  <FormControlLabel
                    style={{color: 'white'}}
                    control={<Radio style={{color: 'white'}} />}
                    label="No"
                    value="No"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {q.questionType === 'feedback' && (
              <FormControl component="fieldset">
                <RadioGroup
                  style={{color: 'white'}}
                  name={`question-${q.questionId}`}
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
                  row
                >
                  <FormControlLabel
                    style={{color: 'white'}}
                    control={<Radio style={{color: 'white'}} />}
                    label="Good"
                    value="Good"
                  />
                  <FormControlLabel
                    style={{color: 'white'}}
                    control={<Radio style={{color: 'white'}} />}
                    label="Bad"
                    value="Bad"
                  />
                  <FormControlLabel
                    style={{color: 'white'}}
                    control={<Radio style={{color: 'white'}} />}
                    label="Very Good"
                    value="Very Good"
                  />
                </RadioGroup>
              </FormControl>
            )}

            <hr />
          </div>
        ))}
      </ul>
      <div className="button-group">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!allQuestionsAnswered} // Disable if not all questions answered
          sx={{ backgroundColor: !allQuestionsAnswered ? 'rgba(0, 0, 255, 0.6)' : undefined, textTransform: "none" }} // Semi-transparent blue
        >
          Submit Answers
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setSelectedSurvey(null)} 
          sx={{ marginLeft: '8px', textTransform: "none" }} // Add margin between buttons
        >
          Back to All Surveys
        </Button>
      </div>

      {/* Snackbar for success alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000} // Duration for alert visibility
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the alert
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          You have completed the survey successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SurveyAnswerForm;
