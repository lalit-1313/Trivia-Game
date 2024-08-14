import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Question = ({ question, options, onAnswerClick, selectedAnswer }) => {
    return (
        <>
            <Typography variant="h6">{question}</Typography>

            <div style={{ margin: "10px" }}>
                {options?.map((option, index) => (

                    <Button key={index}
                        onClick={() => onAnswerClick(option)}
                        style={{ backgroundColor: selectedAnswer === option ? 'lightblue' : '' }}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default Question;
