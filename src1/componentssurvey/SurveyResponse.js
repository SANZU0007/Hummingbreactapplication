import React, { useEffect, useState } from 'react';
import { fetchAllAnswer } from '../ApiService/api';
import "./style/surveyresponse.css";

const SurveyResponse = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getSurveys = async () => {
            try {
                const data = await fetchAllAnswer();
                setSurveys(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSurveys();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    return (
        <div className="survey-response-container">
            <h1 className="survey-title-head">Survey Responses</h1>
            {surveys.length > 0 ? (
                <div style={{display:"flex" ,flexDirection:"column"}} >
                    {surveys.map((survey) => (
                        <div style={{display:"flex" ,flexDirection:"column", alignItems:"flex-start"}}  key={survey.surveyId}>
                            <div style={{display:"flex" ,flexDirection:"column"}} className="survey-header">
                                <h1 className="survey-title-text">Survey Title : {survey.Title}</h1>
                                <p className="survey-username"> UserName : {survey.username}</p>

                                <div className="question-list">
                                {survey.questions.map((question, index) => (
                                    <div key={question.questionId} className="question-item">
                                        <p className="question-text">
                                            {index + 1}. {question.text}
                                        </p>
                                        <p className="answer-text">
                                            Answer: {question.answer}
                                        </p>
                                    </div>
                                ))}
                                <hr style={{width:"100%"}}></hr>
                            </div>
                            </div>

                           
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-surveys-message">No surveys found.</p>
            )}
        </div>
    );
};

export default SurveyResponse;
