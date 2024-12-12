// This file is responsible for Creating new Exams in the Course.
'use client'
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const CreateExam = () => {
  const [examName, setExamName] = useState("");
  const [examDes, setExamDes] = useState("");
  const [examDur, setExamDur] = useState("");
  const [exammarks, setExammarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  //const { id }=router.query;
  //const params=useParams();
  const {id}=useParams();
  //console.log(id);
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setLoading(true);
    setError(""); // Reset error state

    // Prepare data for the POST request
    const newExamData = {
      title: examName,
      description: examDes,
      duration: examDur,
      marks: exammarks,
    };
    
    try {
      // Make the POST request using axios
      const response = await axios.post(`http://localhost:8080/exam/create/${id}`, newExamData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      // Handle successful exam creation
      console.log("New exam created:", response.data);
      router.push("/dashboard/examiner"); // Navigate to the examiner dashboard
    } catch (err) {
      // Handle error
      console.error("Error creating exam:", err);
      setError("Failed to create exam. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Create New Exam</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleCreate}>
            <div className="mb-4">
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Enter Exam Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={examDes}
                onChange={(e) => setExamDes(e.target.value)}
                placeholder="Enter Exam Description"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={examDur}
                onChange={(e) => setExamDur(e.target.value)}
                placeholder="Enter Duration (minutes)"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={exammarks}
                onChange={(e) => setExammarks(e.target.value)}
                placeholder="Enter Marks"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-black py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {loading ? "Creating..." : "Create Exam"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
