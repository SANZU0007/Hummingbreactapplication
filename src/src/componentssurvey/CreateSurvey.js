import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style/create.css";
import { Button, Select, MenuItem } from '@mui/material';
import { apiUrl } from '../api';

const SurveyForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionId: 1, text: '', questionType: 'checkbox' }]);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionType = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionId: questions.length + 1, text: '', questionType: 'checkbox' }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    updatedQuestions.forEach((q, idx) => (q.questionId = idx + 1));
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const surveyPayload = {
      title,
      questions,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/surveys`, surveyPayload);
      console.log('Survey created successfully:', response.data);
      setOpenAlert(true);
      setTitle('');
      setQuestions([{ questionId: 1, text: '', questionType: 'checkbox' }]);
      // setTimeout(() => {
      //   navigate('/all');
      // }, 1500);
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div style={{ backgroundColor: "#002525", height: "100vh", padding: "20px", color: "white", overflow: "auto" }}>
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='Please enter your survey name'
            id="survey-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder={`Question ${question.questionId}`}
              value={question.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              required
              style={{ flex: 1, padding: "8px", marginRight: "10px" }}
            />
            <Select
              value={question.questionType}
             
              onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
              style={{ 
                height:"40px",
                marginRight: "10px", color: "white", backgroundColor: "#1976D2",}}
            >
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="feedback">Feedback</MenuItem>
              <MenuItem value="Boolean">Boolean</MenuItem>
            </Select>
            <Button variant='contained' type="button" onClick={() => handleRemoveQuestion(index)} style={{ padding: "8px", color: "white",  cursor: "pointer", textTransform: "none" }}>
              Remove
            </Button>
          </div>
        ))}

        <Button type="button" variant='contained' onClick={handleAddQuestion} style={{ textTransform: "none", color: "white",  cursor: "pointer", marginBottom: "10px", marginRight: "50px" }}>
          Add Question
        </Button>

        <Button type="submit" variant='contained' style={{ textTransform: "none", color: "white",cursor: "pointer", marginBottom: "10px" }}>
          Create Survey
        </Button>
      </form>

      {openAlert && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#2ecc71", color: "white", textAlign: "center" }}>
          Survey created successfully!
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
