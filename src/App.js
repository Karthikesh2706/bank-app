import React, { useEffect, useState } from 'react';
import './App.css';
import data from './questions.json';
import correct from './sound/correct.mp3';
import wrong from './sound/wrong.mp3';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectOption, setSelectOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore && !selectOption) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && !selectOption) {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setTimer(10);
        setSelectOption(null);
      } else {
        setShowScore(true);
      }
    }

    return () => clearInterval(interval);
  }, [timer, showScore, currentQuestion, selectOption]);

  const handleClick = (option) => {
    setSelectOption(option);
    setTimer(0);

    if (option === data[currentQuestion].correctOption) {
      setScore((prev) => prev + 1);
      const audio = new Audio(correct);
      audio.play();
    } else {
      const audio = new Audio(wrong);
      audio.play();
    }

    setTimeout(() => {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectOption(null);
        setTimer(10);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setSelectOption(null);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setCurrentQuestion(0);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>Your Score: {score}/{data.length}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}/{data.length}</h2>
          <p>{data[currentQuestion].question}</p>
          <div className="options">
            {data[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleClick(option)}
                style={{
                  backgroundColor:
                    selectOption === option
                      ? option === data[currentQuestion].correctOption
                        ? '#4caf50'
                        : '#f44336'
                      : '',
                }}
                disabled={!!selectOption}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="timer">Time Left: <span>{timer}</span>s</div>
        </div>
      )}
    </div>
  );
}

export default App;