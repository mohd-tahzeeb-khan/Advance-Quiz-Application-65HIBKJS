// pages/questions.js
'use client'
import React, { useState, useEffect } from 'react';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [exams, setexams] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("http://localhost:8080/course/getall"); // Replace with your Spring Boot API URL
      const data = await res.json();
      setQuestions(data);
      console.log("");
      console.log(data);
      setexams(data[0].exams);

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
        {
          exams.map((exam)=> (
            <li key={exam.exam_id}>{exam.creator}{exam.title}{exam.expiredate}{exam.total_marks}{exam.description}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default QuestionsPage;
