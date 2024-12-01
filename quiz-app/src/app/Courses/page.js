'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  // Mock data or you can fetch data from API
  useEffect(() => {
    // Simulating fetching course data
    const fetchCourses = async () => {
      const data = [
        { id: 1, title: "JavaScript for Beginners", description: "Learn the basics of JavaScript" },
        { id: 2, title: "React Fundamentals", description: "Master React for building modern web applications" },
        { id: 3, title: "Full Stack Web Development", description: "Become a full-stack developer" },
        { id: 4, title: "Advanced Node.js", description: "Deep dive into Node.js and backend development" },
      ];
      setCourses(data);
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
              <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <Link className="text-blue-500 mt-4 inline-block hover:underline" href={`/courses/${course.id}`}>
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
