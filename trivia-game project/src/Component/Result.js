import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Result = () => {
    const location = useLocation();
    const { correct, incorrect } = location?.state;

    return (
        <div style={{ margin: "20px" }}>
            <Typography variant="h4">Results</Typography>

            <Typography variant="h6">
                Total Questions Served: {correct + incorrect}
            </Typography>

            <Typography variant="h6">Total Correct Questions: {correct}</Typography>
            <Typography variant="h6">Total Incorrect Questions: {incorrect}</Typography>
        </div>
    );
};

export default Result;
