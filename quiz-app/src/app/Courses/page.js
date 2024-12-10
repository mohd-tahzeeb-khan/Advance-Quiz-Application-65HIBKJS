'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  // Mock data or you can fetch data from API
  useEffect(() => {
    // Simulating fetching course data
    const fetchCourses = async () => {
      const config={
        headers:{
          Authorization:`Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type":"application/json"
        },
      };
      try{
        const data=await axios.get("http://localhost:8080/course/getall", config)
      setCourses(data.data);
      console.log(data.data);
      }catch(err){
        console.log(err);
      }
      
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{course.name}</h2>
              <p className="text-gray-600 mt-2">{course.category}</p>
              <Link className="text-extradarkblue mt-4 inline-block hover:underline" href={`/Courses/${course.id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
