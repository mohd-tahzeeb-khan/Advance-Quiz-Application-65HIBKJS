'use client'
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page(){
    const [Exams, setExams] = useState([])
    const [loading, setloading] = useState(true)
    const [Error, setError] = useState("")
    // const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMzMDc5ODI0LCJleHAiOjE3MzMwODM0MjR9.fOfCtc26naJhLGPH5A5ozDiRj54U_X5jcLvTz_-gJ7Y";
    useEffect(() => {
      const fetchdata=async () => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type":"application/json"
            },
        };
        setloading(true);
        try {
            console.log(config)
            const response= await axios.get('http://localhost:8080/exam/getallexam', config);
            const data=response.data;
            setExams(data);
            console.log(data)

            setloading(false);
        } catch (error) {
            setError(error.message || "An error Occured");
            setloading(false); 
            
        }
      }
      fetchdata();
    }, []);
    if (loading) return <p>Loading exams...</p>;
    if (Error) return <p>{Error}</p>;
    if (!Exams) return <p>No exams found</p>;
    

    return (
        <div>
           <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Exams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Exams.map((data) => (
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


      
}