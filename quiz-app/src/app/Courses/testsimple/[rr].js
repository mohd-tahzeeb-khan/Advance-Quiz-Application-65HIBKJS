'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios';
// import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

const page = () => {
  const router=useParams();
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMzMDc2MDg1LCJleHAiOjE3MzMwNzk2ODV9.SpEueSUuKRb1tB217NySsjuU8djZ12auCHsiPAOnk0Q";

    const [courses, setCourses] = useState([]);
    const [exam, setexam] = useState([])
    useEffect(() => {

     const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json",
        },
        //withCredentials:true,
      };

      // setLoading(true);
      try {
      const response = await axios.get(`http://localhost:8080/course/getall`);
        const data = response.data;
        setexam(data);
        console.log("Fetched exams:", data);
        // setLoading(false);
      } catch (error) {
        // setError(error.message || "An error occurred");
        // setLoading(false);
      }
    };
    fetchData();
    }, [])
    
  
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
        
      const handleCardClick = (id) => {
        if(id!=null){

            router.push(`/Exams/${id}`);
        }else{
            console.log(id)
        }
      };
  return (
    <>
    
    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {courses.map((course, index) => (
    <div
      key={course.id}
      className="rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      style={{
        backgroundColor: colors[index % colors.length],
      }}
    >
      <div className="p-4">
        {/* Accessing the first exam's exam_id (example: if you only need the first one) */}
        {course.exams.length > 0 && (
          <h2
            onClick={() => handleCardClick(course.exams[0].exam_id)} // Accessing the first exam's ID
            className="text-xl font-bold text-white mb-2"
          >
            {course.name}
          </h2>
        )}
        <p className="text-white opacity-90">{course.category}</p>
      </div>
    </div>
  ))}
</div>

    
    </>
  )
}

export default page