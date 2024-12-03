'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

const Exams = () => {
  const [exams, setExams] = useState([]);

  // Mock data or you can fetch exam data from your API
  useEffect(() => {
    const fetchExams = async () => {
      const data = [
        { id: 1, title: "JavaScript Basics Exam", description: "Test your knowledge of JavaScript fundamentals" },
        { id: 2, title: "React JS Advanced Exam", description: "Challenge your React skills with this advanced exam" },
        { id: 3, title: "Full Stack Developer Certification", description: "Full stack exam covering frontend and backend" },
        { id: 4, title: "Node.js and Express.js Exam", description: "Test your backend development skills with Node.js and Express.js" },
      ];
      setExams(data);
    };

    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Exams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{exam.title}</h2>
              <p className="text-gray-600 mt-2">{exam.description}</p>
              <Link className="text-blue-500 mt-4 inline-block hover:underline" href={`/exams/${exam.id}`}>
                Start Exam
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exams;
