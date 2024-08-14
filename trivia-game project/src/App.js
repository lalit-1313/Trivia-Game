import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TriviaGame from './Trivia-Game';
import Result from './Component/Result';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TriviaGame />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
