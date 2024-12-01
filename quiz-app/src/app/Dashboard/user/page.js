'use client'
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Static user data, replace with actual user data from an API
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    totalExams: 5,
    examsResults: [
      { exam: "JavaScript Basics", score: 85 },
      { exam: "React Advanced", score: 90 },
      { exam: "Node.js Exam", score: 80 },
      { exam: "Full Stack Development", score: 75 },
      { exam: "Express.js", score: 88 },
    ],
  };

  // Prepare data for the progress chart
  const scores = userData.examsResults.map(result => result.score);
  const examNames = userData.examsResults.map(result => result.exam);

  const chartData = {
    labels: examNames,
    datasets: [
      {
        label: "Exam Scores",
        data: scores,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // State to handle personal information and results
  const [user, setUser] = useState(userData);

  // You can replace this with an API call to fetch user data
  useEffect(() => {
    // Mock API call to fetch user data
    // In real-world scenarios, you would fetch this data from a server
    setUser(userData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">User Dashboard</h1>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <p className="text-gray-600 mt-2">Name: {user.name}</p>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>

        {/* Total Exams and Results */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Exam Results</h2>
          <p className="text-gray-600 mt-2">Total Exams Taken: {user.totalExams}</p>
          <div className="mt-4">
            {user.examsResults.map((result, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-800">{result.exam}</span>
                <span className="text-gray-600">{result.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Progress Chart</h2>
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
