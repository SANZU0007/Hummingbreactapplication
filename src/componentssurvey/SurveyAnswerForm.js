import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider
} from '@mui/material'; // Import Material-UI components
import "./style/surveyanswer.css";

const SurveyAnswerForm = ({ selectedSurvey, setSelectedSurvey, userId }) => {
  const [answers, setAnswers] = useState({});
  const [openAlert, setOpenAlert] = useState(false); // State for Snackbar visibility
  const [openDialog, setOpenDialog] = useState(true); // Open dialog on load
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const User = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    try {
      const surveyResponse = {
        Title: selectedSurvey.title,
        userId: 1, // Use the user ID passed as a prop
        surveyId: selectedSurvey._id,
        username: User.name,
        companyName: User.companyName,
        questions: selectedSurvey.questions.map((q) => ({
          questionId: q.questionId,
          text: q.text,
          answer: answers[q.questionId],
        })),
      };

      // Send the data using axios
      const response = await axios.post('https://adminuserwebapi.onrender.com/api/answers', surveyResponse);
      console.log('Survey response submitted successfully:', response.data);
      
      // Show alert on success
      setOpenAlert(true);
      
      // Close dialog and reset the form or navigate back to survey list
      setTimeout(() => {
        setSelectedSurvey(null);
        setOpenDialog(false); // Close the dialog
      }, 3000);
     
    } catch (error) {
      console.error('Error submitting survey response:', error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); // Close the alert
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedSurvey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move to the previous question
    }
  };

  // Check if all questions are answered
  const allQuestionsAnswered = selectedSurvey.questions.every(q => answers[q.questionId] !== undefined);

  const currentQuestion = selectedSurvey.questions[currentQuestionIndex];

  const CloseDialog = ()=> {
    setOpenDialog(false);
    setSelectedSurvey(null);
  }

  const handleQuestionSwitch = (index) => {
    setCurrentQuestionIndex(index);
  }

  return (
    <Dialog open={openDialog} onClose={CloseDialog} fullWidth 
      PaperProps={{
        style: {
          width: `${window.Width}px`, 
          height: '100%', // 90% of the window's width
          border: "2px solid #015757",
          backgroundColor: "#021717",
          borderRadius: "15px",
          color: "white",
          padding: "10px",
          marginLeft: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: "left",
        },
      }}
    >
      <DialogTitle>{selectedSurvey.title}</DialogTitle>
      <hr></hr>
     
      <DialogContent>
        {/* Display radio buttons to switch questions */}
       

        <br />
        <p>{currentQuestion.text}</p>
        <br />

        {currentQuestion.questionType === 'checkbox' && (
          <FormControl component="fieldset">
            <RadioGroup
              style={{ color: 'white',  }}
              size="small"
              name={`question-${currentQuestion.questionId}`}
              value={answers[currentQuestion.questionId] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.questionId, e.target.value)}
              row
            >
              {Array.from({ length: 11 }, (_, idx) => (
                <FormControlLabel
                  key={idx}
                  control={<Radio 

                   
                    
                    size='small' style={{ color: 'white',fontSize:"5px" }} />}
                  label={idx}
                  value={idx}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {currentQuestion.questionType === 'Boolean' && (
          <FormControl component="fieldset">
            <RadioGroup
              style={{ color: 'white' }}
              name={`question-${currentQuestion.questionId}`}
              value={answers[currentQuestion.questionId] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.questionId, e.target.value)}
              row
            >
              <FormControlLabel
                style={{ color: 'white' }}
                control={<Radio style={{ color: 'white' }} />}
                label="Yes"
                value="Yes"
              />
              <FormControlLabel
                style={{ color: 'white' }}
                control={<Radio style={{ color: 'white' }} />}
                label="No"
                value="No"
              />
            </RadioGroup>
          </FormControl>
        )}

        {currentQuestion.questionType === 'feedback' && (
          <FormControl component="fieldset">
            <RadioGroup
              style={{ color: 'white' }}
              name={`question-${currentQuestion.questionId}`}
              value={answers[currentQuestion.questionId] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.questionId, e.target.value)}
              row
            >
              <FormControlLabel
                style={{ color: 'white' }}
                control={<Radio style={{ color: 'white' }} />}
                label="Good"
                value="Good"
              />
              <FormControlLabel
                style={{ color: 'white' }}
                control={<Radio style={{ color: 'white' }} />}
                label="Bad"
                value="Bad"
              />
              <FormControlLabel
                style={{ color: 'white' }}
                control={<Radio style={{ color: 'white' }} />}
                label="Very Good"
                value="Very Good"
              />
            </RadioGroup>
          </FormControl>
        )}


<br></br>



      </DialogContent>

      

      <DialogActions style={{display:"flex" ,flexDirection:"column" ,gap:"10px"}}>


      <FormControl component="fieldset">
     
     <RadioGroup
       name="question-switch"
       value={currentQuestionIndex}
       onChange={(e) => handleQuestionSwitch(Number(e.target.value))}
       row
     >
       {selectedSurvey.questions.map((q, index) => (
         <FormControlLabel
           key={q.questionId}
           value={index}
           control={<Radio size='small' style={{ color: 'white' }} />}
         
         />
       ))}
     </RadioGroup>
   </FormControl>

      <div>

        {currentQuestionIndex < selectedSurvey.questions.length - 1 && (
          <Button onClick={handleNext} style={{backgroundColor:"transparent",
            border:"1px solid white",
            borderRadius:"15px",
            width:"150px",



          }} 
          variant="contained" color="primary">
            Next
          </Button>
        )}

        {currentQuestionIndex === selectedSurvey.questions.length - 1 && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!allQuestionsAnswered}
          >
            Submit Answers
          </Button>
        )}
      </div>

      </DialogActions>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          You have completed the survey successfully!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default SurveyAnswerForm;
