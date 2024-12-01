'use client'

import header from "@/app/components/header"
import axios from "axios"

const { useState, useEffect } = require("react")

export default function Page(){
    const [Exams, setExams] = useState([])
    const [loading, setloading] = useState(true)
    const [Error, setError] = useState("")
    const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMzMDc2MDg1LCJleHAiOjE3MzMwNzk2ODV9.SpEueSUuKRb1tB217NySsjuU8djZ12auCHsiPAOnk0Q";
    useEffect(() => {
      const fetchdata=async () => {
        const config={
            header:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        };
        setloading(true);
        try {
            const response=await axios.get("http://localhost:8080/exam/getallexam", config);
            const data=response.data;
            setExams(data);
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
          <div className="flex">Title: <h3>{Exams.title}</h3></div>
          <div className="flex">Marks: <h3>{Exams.total_marks}</h3></div>
          <div className="flex">Description: <h3>{Exams.description}</h3></div>
          <div className="flex">Creator: <h3>{Exams.creator}</h3></div>
        </div>
      );
}