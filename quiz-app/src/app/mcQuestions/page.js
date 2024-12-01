// pages/questions.js
'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      id: 3,
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  // Start the timer when the page loads
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          handleNextQuestion();
          return 30; // Reset timer for next question
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Function to handle next question
  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: questions[currentQuestionIndex].id, answer: selectedAnswer },
      ]);
    }

    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30); // Reset timer for next question
    } else {
      // If it's the last question, go to the result page
      router.push("/exam/result");
    }
  };

  // Handle option click
  const handleOptionClick = (answer) => {
    setSelectedAnswer(answer);
  };

  // Start timer when the quiz starts
  useEffect(() => {
    setIsTimerRunning(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-lg font-semibold text-red-500">{timer}s</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {questions[currentQuestionIndex].question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`p-3 border border-gray-300 rounded-lg cursor-pointer transition duration-300 text-black
                  ${selectedAnswer === option ? "bg-extradarkblue text-white " : "hover:bg-gray-200"}`}
              >
                {option}
              </div>
            ))}
          </div>

          {/* Next Question Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 bg-blue-500 text-white bg-green-500 rounded-lg font-semibold 
                ${selectedAnswer === null ? "opacity-80 cursor-not-allowed " : "hover:bg-blue-600"}`}
            >
              Next Question
            </button>
            <p className="text-sm text-gray-500">You cannot go back to previous questions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
