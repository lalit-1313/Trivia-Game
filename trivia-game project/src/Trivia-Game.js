import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Component/Question';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TriviaGame = () => {
    const [questions, setQuestions] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [showResult, setShowResult] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10');
            response?.data ? setQuestions(response.data.results) : setQuestions();
        } catch {
            setErrorMessage('Unable to load. Please refresh the page or check your internet connection.');
        }
        finally {
            setLoading(false);
        }
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };


    const handleSubmit = () => {
        let correctAnswer = questions?.[currentQuestionIndex]?.correct_answer;
        if (selectedAnswer == correctAnswer) {
            setScore(prevScore => ({ ...prevScore, correct: prevScore?.correct + 1 }));
        } else {
            setScore(prevScore => ({ ...prevScore, incorrect: prevScore?.incorrect + 1 }));
        }
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    if (currentQuestionIndex == 10) {
        return (
            <Navigate
                to="/result"
                state={{ correct: score?.correct, incorrect: score?.incorrect }}
            />
        );
    }

    return (
        <>
            {loading ? (
                <Typography sx={{ textAlign: "center", marginTop: "300px" }} variant="h4" > Loading...</Typography>
            ) : errorMessage ? (
                <Typography sx={{ margin: "10px" }} variant="h5">{errorMessage}</Typography>
            ) :
                questions?.length > 0 && (
                    <>
                        <Question
                            question={questions[currentQuestionIndex]?.question}
                            options={[...questions[currentQuestionIndex]?.incorrect_answers, questions[currentQuestionIndex]?.correct_answer]}
                            onAnswerClick={handleAnswerClick}
                            selectedAnswer={selectedAnswer}
                        />

                        <Button
                            sx={{ margin: "10px" }}
                            variant={"contained"} size="small"
                            color={"primary"}
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                        >
                            Submit
                        </Button>

                        {showResult && (
                            <div style={{ margin: "10px" }}>
                                {selectedAnswer == questions[currentQuestionIndex]?.correct_answer ? (
                                    <Typography variant="h6">Correct!</Typography>
                                ) : (
                                    <Typography variant="h6">Incorrect! The correct answer is: {questions[currentQuestionIndex]?.correct_answer}</Typography>
                                )}

                                <Button
                                    sx={{ margin: "10px" }}
                                    variant={'contained'} size="small"
                                    color={"secondary"}
                                    onClick={handleNextQuestion}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
        </>
    );
};

export default TriviaGame;
