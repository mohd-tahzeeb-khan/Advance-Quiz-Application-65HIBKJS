'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Page(){
    const [Exams, setExams] = useState([])
    const [loading, setloading] = useState(true)
    const [Error, setError] = useState("")
    const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMzMDc5ODI0LCJleHAiOjE3MzMwODM0MjR9.fOfCtc26naJhLGPH5A5ozDiRj54U_X5jcLvTz_-gJ7Y";
    useEffect(() => {
      const fetchdata=async () => {
        const config={
            headers:{
                Authorization:`Bearer ${token}`,
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
          <h2>Exam Details</h2>
          <div className="flex gap-5 m-4 h-1/2 bg-green-400 ">
            {
                Exams.map((data)=>(
                    <div  key={data.exam_id} className="m-3 rounded-lg p-5 bg-white text-black hover:scale-110 hover:duration-500 hover:delay-100 hover:border-2 hover:border-black">
                        <h1>{data.title}</h1>
                        <h1>{data.description}</h1>
                        <h1>{data.total_marks}</h1>

                    </div>
                ))
            }
          </div>
        </div>
      );
}