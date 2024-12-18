'use client'
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
const AddQuestionsPage = () => {
  const router=useParams();
    const { insert }=router;
  const [questions, setQuestions] = useState([
    { id: Date.now(), question: "", statement: "", code: "", options: [""], correctAnswer: "" },
  ]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), question: "", statement: "", code: "", options: [""], correctAnswer: "" },
    ]);
  };
  const removequestion=(id)=>{
    const updatequestions=questions.filter((question)=>question.id !==id);
    setQuestions(updatequestions);
  }
  // Update question data
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Add an option to a question
  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  // Remove an option from a question
  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  // Update option value
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Submit questions
  const handleSubmit = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type":"application/json",
      },
      //withCredentials:true,
    };
    try {
      const response = await axios.post(`http://localhost:8080/mcquestion/addQuestions/${insert}`, {
        mcq:questions
      },
        config
      );
      console.log(response.data); // Handle the response
    } catch (err) {
      console.log(err.message); // Handle the error
    }
    console.log("Submitted Questions:", questions);
    // You can send `questions` to your backend API
  };

  return (
    <div className="p-[20px] bg-white h-full text-black">
      <h1>Add MCQ Questions</h1>
      {questions.map((q, questionIndex) => (
        <div key={q.id} className="border-2 border2 border-[#a632ff] p-3" >
          <div>
            <div className="flex justify-between">
              <label>Question:</label>
              <button  className="text-red-700 font-bold text-4xl">X</button>
            </div>
            
            <textarea className="border-2 border-black p-2"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleInputChange(questionIndex, "question", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
        <div className="flex gap-5  w-full">
          <div className="flex flex-col w-1/2">
            <label>Statement (Optional):</label>
            <textarea className="border-black border-2 p-1"
              placeholder="Enter statement"
              value={q.statement}
              onChange={(e) => handleInputChange(questionIndex, "statement", e.target.value)}
              
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label>Code (Optional):</label>
            <textarea className="text-black p-1 border-black border-2"
              placeholder="Enter code"
              value={q.code}
              onChange={(e) => handleInputChange(questionIndex, "code", e.target.value)}
              
            />
          </div>
          </div>
          <div>
            <label>Options:</label>
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <input className="text-black border-2 border-black p-2"
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  style={{ flex: "1", marginRight: "10px" }}
                />
                {q.options.length > 2 && (
                  <button className="bg-red-500 hover:bg-red-600 text-white p-2 m-2 rounded-3xl"
                    type="button"
                    onClick={() => removeOption(questionIndex, optionIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {q.options.length < 5 && (
              <button className="bg-green-400 hover:bg-green-500 text-black p-2 m-2 rounded-3xl" type="button" onClick={() => addOption(questionIndex)}>
                Add Option
              </button>
            )}
          </div>

          <div>
            <label>Correct Answer:</label>
            <input className="border-2 border-black p-2"
              type="text"
              placeholder="Enter correct answer"
              value={q.correctAnswer}
              onChange={(e) => handleInputChange(questionIndex, "correctAnswer", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
        </div>
      ))}
    <div className="flex justify-between px-10">
      <button onClick={addQuestion} className="bg-green-500 text-black p-2 rounded-md m-4 hover:scale-105 hover:duration-500">
        Add Another Question
      </button>
      <button onClick={handleSubmit} className="bg-yellow-500 text-black p-2 rounded-md m-4 hover:scale-105 hover:duration-500">Submit Questions</button>
      </div>
    </div>
  );
};

export default AddQuestionsPage;
