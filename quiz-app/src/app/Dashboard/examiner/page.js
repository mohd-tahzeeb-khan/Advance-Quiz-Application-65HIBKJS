'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ExaminerDashboard = () => {
  // Static user data, replace with actual user data from an API
  const examinerData = {
    name: "Jane Smith",
    email: "janesmith@example.com",
    totalExams: 5,
    exams: [
      { id: 1, name: "JavaScript Basics" },
      { id: 2, name: "React Advanced" },
      { id: 3, name: "Node.js Fundamentals" },
      { id: 4, name: "Full Stack Development" },
      { id: 5, name: "Express.js Deep Dive" },
    ],
  };

  // State to handle examiner data
  const [examiner, setExaminer] = useState(examinerData);

  const router = useRouter();

  // Navigate to create new exam page
  const handleCreateExam = () => {
    router.push("/examiner/create-exam");
  };

  // Navigate to alter an existing exam
  const handleAlterExam = (examId) => {
    router.push(`/examiner/edit-exam/${examId}`);
  };

  // Navigate to add questions for a specific exam
  const handleAddQuestions = (examId) => {
    router.push(`/examiner/add-questions/${examId}`);
  };

  useEffect(() => {
    // In a real-world scenario, you would fetch this data from an API
    setExaminer(examinerData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Examiner Dashboard</h1>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <p className="text-gray-600 mt-2">Name: {examiner.name}</p>
          <p className="text-gray-600">Email: {examiner.email}</p>
        </div>

        {/* Total Exams and Options */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Exam Management</h2>
          <p className="text-gray-600 mt-2">Total Exams Created: {examiner.totalExams}</p>

          {/* Create New Exam Button */}
          <div className="mt-4">
            <button
              onClick={handleCreateExam}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Create New Exam
            </button>
          </div>

          {/* List of Existing Exams */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700">Exams Created:</h3>
            <ul className="mt-4 space-y-4">
              {examiner.exams.map((exam) => (
                <li key={exam.id} className="flex justify-between items-center">
                  <span className="text-gray-800">{exam.name}</span>
                  <div className="flex space-x-4">
                    {/* Edit Exam Button */}
                    <button
                      onClick={() => handleAlterExam(exam.id)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                    >
                      Edit Exam
                    </button>
                    {/* Add Questions Button */}
                    <button
                      onClick={() => handleAddQuestions(exam.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Add Questions
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminerDashboard;
