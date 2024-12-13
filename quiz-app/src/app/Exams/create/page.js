'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateExam = () => {
  const [examName, setExamName] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    // Handle API call to create a new exam here
    console.log("New exam created:", examName);

    // After successful creation, navigate to the examiner dashboard
    router.push("/Dashboard/examiner");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Create New Exam</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Enter Exam Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Create Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
