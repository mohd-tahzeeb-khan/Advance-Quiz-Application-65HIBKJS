'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";

export default function Page() {
  const [Exams, setExams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMyOTYzMDE1LCJleHAiOjE3MzI5NjY2MTV9.k1kM1yNXbN_dTvoaX7SFC8kQxz9CetdQ6weUS_TbI6M";
  const { examid } = useParams();  // Get examid from URL params
  console.log('Exam ID:', examid);

  useEffect(() => {
    if (!examid) {
      // If no examid is available, you might want to handle this case
      setError("Exam ID is missing.");
      setLoading(false);
      return;
    }

    const parsedId = parseInt(examid, 10);
    if (isNaN(parsedId)) {
      setError("Invalid exam ID.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json",
        },
        //withCredentials:true,
      };

      setLoading(true);
      try {
      const response = await axios.get(`http://localhost:8080/exam/getexams/${examid}`, config);
        const data = response.data;
        setExams(data);
        console.log("Fetched exams:", data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [examid]); // Run the effect whenever examid changes

  if (loading) return <p>Loading exams...</p>;
  if (error) return <p>{error}</p>;
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
