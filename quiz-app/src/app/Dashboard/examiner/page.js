'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/app/context/dataContext";
import axios from "axios";
import Link from "next/link";
//import { Link } from "lucide-react";
const ExaminerDashboard = () => {
  const router=useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [deleteid, setdeleteid] = useState(0);
  const [examno, setexamno] = useState(0)
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
  const [examiner,setExaminer] = useState({
    name: "----",
    email: "------",
    mobile:"-----",
    city:"------",
    state:"-----",
    zip:"------",
    noofexams:"-------",
    courses:[],
    examsResults: [{
      
  },  
  ]
  })
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// -----------------------------This below method will create a Course into the database by send a post request to the backend server api.-------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configheader={
      // jwttToken:localStorage.getItem("jwtToken"),
      headers:{
        Authorization:`Bearer ${localStorage.getItem('jwtToken')}`,
        "Content-Type":"application/json"
    },};
    try {
      // console.log("Payload:", JSON.stringify({ course: formData }, null, 2));
      const response = await axios.post("http://localhost:8080/course/create",
       {
        course:formData
       }, 
       configheader
      );
      if (response.status === 201) {
        setIsOpen(false); // Close the popup
        setFormData({ name: "", category: "" }); // Clear the form
        setError(""); // Clear any errors
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    }
  };
// ------------------------------------------------------------------------------------------------------
// -------------------------------This below method will clear the course form-----------------------------------------------------------------------
  
const handleClear = () => {
    setFormData({ name: "", category: "" });
    setError("");
  };
// ------------------------------------------------------------------------------------------------------

  // Navigate to create new exam page
  const handleCreateExam =async (id) => {
    router.push(`examiner/exams/${id}`);
  };

  // Navigate to alter an existing exam
  const handleAlterExam =(examId, exams) => {
  setdeleteid(exams);
  setexamno(examId);
  setShowPopup(true);
  }

  // Navigate to add questions for a specific exam
  const handleAddQuestions = (examId) => {
    router.push(`/examiner/add-questions/${examId}`);
  };
  const handleaddCourses = () => {
    router.push(`/Courses/insert`);
  };
  const handleDelete = async() => {
    const configheader={
      // jwttToken:localStorage.getItem("jwtToken"),
      headers:{
        Authorization:`Bearer ${localStorage.getItem('jwtToken')}`,
        "Content-Type":"application/json"
    },};
    
    const response = await axios.delete(`http://localhost:8080/course/delete/${examno}`, configheader)
    
    setdeleteid(examId)
    setShowPopup(false); // Close popup after delete logic
  };

  useEffect(() => {
    const fetchdata=async ()=>{
  
  
      const configheader={
        // jwttToken:localStorage.getItem("jwtToken"),
        headers:{
          Authorization:`Bearer ${localStorage.getItem('jwtToken')}`,
          "Content-Type":"application/json"
      },};
      try{
        const userdataget=await axios.get(`http://localhost:8080/examiner/getexaminer`, configheader)
        const data=userdataget.data;
        console.log("data",data);
        setExaminer({
          name:data.name,
          email:data.email,
          mobile:data.mobile,
          city:data.city,
          zip:data.zip,
          state:data.state,
          courses:data.course,
        })
      }catch(Error ){
        console.error(Error);
  
      }
      };
      fetchdata();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Delete Confirmation
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Are you sure you want to delete this Course? <strong className="text-black font-bold">This Course have {deleteid} Exams.</strong> This action cannot be undone.
            </p>
            <div className="flex justify-around">
              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Delete Anyway
              </button>
              {/* Cancel Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Examiner Dashboard</h1>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <p className="text-gray-600 mt-2">Name: {examiner.name}</p>
          <p className="text-gray-600">Email: {examiner.email}</p>
          <p className="text-gray-600 mt-2">Mobile: {examiner.mobile}</p>
         
          <p className="text-gray-600 mt-2">City: {examiner.city}</p>
          <p className="text-gray-600">State: {examiner.zip}</p>
         
        </div>

        {/* Total Courses and Options */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Manage your Courses</h2>
        <div className="w-full flex justify-between px-10">
          <div>
            <p className="text-gray-600 mt-2">Total Courses Created: {examiner.totalExams}</p>
          </div>
            {/* Create New Exam Button */}
            <div className="mt-4">
                <button
                  onClick={handleCreateExam}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                 Create New Course5555
                </button>
          </div>
        </div>
          

          
          <button
                      onClick={() => setIsOpen(true)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      New Courses
                    </button>
                    {/* POP for the New Course... */}
                    {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Enter Course Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-3xl  text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
      {/*  */}
      {/* ---------------------------- */}
          {/* List of Existing Exams */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700">Your Courses:</h3>
            <ul className="mt-4 space-y-4">
              {examiner.courses.map((course) => (
                <li key={course.id} className="flex justify-between items-center">
                  <Link className="text-black" href={`examiner/exams/show/${course.id}`}>
                    <span className="text-gray-800 w-56">{course.name}</span>
                  </Link>
                  
                  <span className="text-gray-800">{course.exams.length}</span>
                  <div className="flex space-x-4">
                    {/* Edit Exam Button */}
                    <button
                      onClick={() => handleCreateExam(course.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Create Exams
                    </button>
                    <button
                      onClick={() => handleAlterExam(course.id, course.exams.length)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete Course
                    </button>
                    {/* Add Questions Button */}
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
{/*_________________________________________Start of Exams________________________________________________ */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Manage your Exams</h2>
        <div className="w-full flex justify-between px-10">
            {/* Create New Exam Button */}
            <div className="mt-4">
                <button
                  onClick={handleCreateExam}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                 Create New Course5555
                </button>
          </div>
        </div>
          

          
          <button
                      onClick={() => setIsOpen(true)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      New Courses
                    </button>
                    {/* POP for the New Course... */}
                    {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Enter Course Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-3xl  text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
      {/*  */}
      {/* ---------------------------- */}
          {/* List of Existing Exams */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700">Your Courses:</h3>
            <ul className="mt-4 space-y-4">
              {examiner.courses.map((course) => (
                <li key={course.id} className="flex justify-between items-center">
                  <span className="text-gray-800 w-56">{course.name}</span>
                  <span className="text-gray-800">{course.exams.length}</span>
                  <div className="flex space-x-4">
                    {/* Edit Exam Button */}
                    <button
                      onClick={() => handleCreateExam(course.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Create Exams
                    </button>
                    <button
                      onClick={() => handleAlterExam(course.id, course.exams.length)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete Course
                    </button>
                    {/* Add Questions Button */}
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* End of Exam */}
      </div>
    </div>
  );
};
export default ExaminerDashboard;
