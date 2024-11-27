// pages/questions.js
'use client'
import React, { useState, useEffect } from 'react';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('http://localhost:8080/course/getall'); // Replace with your Spring Boot API URL
      const data = await res.json();
      setQuestions(data);
      console.log(data);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>All Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.id}{question.name}{question.category}</li> // Adjust field names based on your Question model
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;
