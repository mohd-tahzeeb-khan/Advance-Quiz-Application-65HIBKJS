'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
    const [courses, setCourses] = useState([]);
    const [exam, setexam] = useState([])
    useEffect(() => {
      axios.get("http://localhost:8080/course/getall").then((data)=>{
        setCourses(data?.data);
        setexam(data[0].exams)
      })
    }, [])
    
  
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
  
      const handleCardClick = (id) => {
        console.log(id)
        // router.push(`localhost:8080/exam/getexams/${id}`);
      };
  return (
    <>
    
    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course, index) => (
        <div
          key={course.id}
          onClick={() => handleCardClick(exam.exam_id)}
          className="rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
          style={{
            backgroundColor: colors[index % colors.length],
          }}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{course.name}</h2>
            <p className="text-white opacity-90">{course.category}</p>
          </div>
        </div>
      ))}
    </div>
    
    </>
  )
}

export default page