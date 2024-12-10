'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "../context/dataContext";
import axios from "axios";

const QuizPage = () => {
  const { dataoncontext } = useData();
  const [questions, setQuestions] = useState([]); // Initialize questions state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    const fetchdata = async () => {
      const configheader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const userdataget = await axios.get(`http://localhost:8080/exam/getexams/${dataoncontext.examid}`, configheader);
        const data = userdataget.data.mcq_handler.questions;
        setQuestions(data);  // Set questions state with fetched data
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, [dataoncontext.examid]);

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
        { answer: selectedAnswer },
      ]);
      console.log(answers);
    }

    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30); // Reset timer for next question
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      // If it's the last question, go to the result page
      console.log(answers);
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

  // Function to handle the "Finish" button click
  const handleFinish = async () => {
    if (selectedAnswer !== null) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {selectedAnswer },
      ]);
    }

    try {
      const configheader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          "Content-Type": "application/json",
        },
      };

      // Send the answers array to the server
      await axios.post(
        `http://localhost:8080/result/ResultCheck`,
        { mcq: answers }, // Send the answers array
        configheader
      );

      // After submitting, redirect to the result page or confirmation
      router.push("/exam/result");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

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

          {/* Display question text */}
          {questions.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {questions[currentQuestionIndex].question}
              </h2>

              {/* Display options for the current question */}
              <div className="space-y-4 mb-4">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`p-3 border border-gray-300 rounded-lg cursor-pointer transition duration-300 text-black
                      ${selectedAnswer === option ? "bg-extradarkblue text-white" : "hover:bg-gray-200"}`}
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
                    ${selectedAnswer === null ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-600"}`}
                >
                  Next Question
                </button>
                <p className="text-sm text-gray-500">You cannot go back to previous questions</p>
              </div>
            </>
          )}

          {/* Finish Button (appears after the last question) */}
          {currentQuestionIndex === questions.length - 1 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleFinish}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
