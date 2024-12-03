'use client'
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CourseDetail = () => {
 const {id}=useParams()


 const [examList, setexamList] = useState([])
  const course = id;
  useEffect(() => {
    const fetchdata=async()=>{
      const config={
        headers:{
          Authorization:`Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type":"application/json"
        },
      };
      // setLoader(true)
      try {
        const response=await axios.get(`http://localhost:8080/course/getbyid/${course}`, config);
        const data=response.data;
        const examData=data.exams;
        console.log(examData.id);
        setexamList(examData);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [])
  

  // if (!course) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div className="min-h-screen bg-gray-100 py-10">
    //   <div className="max-w-screen-xl mx-auto px-4">
    //     <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{course.title}</h1>
    //     <p className="text-gray-600">{course.description}</p>
    //   </div>


      <div>
           <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Exams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examList.map((data) => (
            <div
              key={data.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{data.title}</h2>
              <p className="text-gray-600 mt-2">{data.description}</p>
              <Link className="text-green-600 mt-4 inline-block hover:underline" href={`/Exams/${data.exam_id}`}>
                Start Exam
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>



        </div>
  );
};

export default CourseDetail;
