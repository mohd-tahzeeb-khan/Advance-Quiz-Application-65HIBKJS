'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";

export default function Page() {
  const [Exams, setExams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbWFhbmNhdGVyczc4NkBnbWFpbC5jb20iLCJpYXQiOjE3MzI4ODE0NjksImV4cCI6MTczMjg4NTA2OX0.ArNdcfTO1a4nyyNLa5h0VUfUCyYppATpJpJun3IBRPc";
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
        },
      };

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/exam/getexams/${parsedId}`, config);
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
      {Exams.map((exam) => (
        <div key={exam.ex_id}>
          <h3>{exam.title}</h3>
          <p>Duration: {exam.duration}</p>
        </div>
      ))}
    </div>
  );
}
