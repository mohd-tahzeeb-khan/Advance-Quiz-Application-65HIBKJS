'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { useData } from "@/app/context/dataContext";
// import { evalManifestWithRetries } from "next/dist/server/load-components";


export default function Page() {
  const [Exams, setExams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWRkdXJhYWpAZ21haWwuY29tIiwiaWF0IjoxNzMzMDgxNTM2LCJleHAiOjE3MzMwODUxMzZ9._kfqusNjpfRZqa6oTwwbpXuCjYWPhonv59xM6_Iizyg";
  const { examid } = useParams();  // Get examid from URL params
  // console.log('Exam ID:', examid);
  const router=useRouter();
  const { setdataoncontext }=useData();
  const { dataoncontext}=useData();
  

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
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type":"application/json",
        },
        //withCredentials:true,
      };

      setLoading(true);
      try {
        //console.log(config)
      const response = await axios.get(`http://localhost:8080/exam/getexams/${examid}`, config);
        const data = response.data;
        setExams(data);
        console.log("Fetched exams:", data);
        setdataoncontext((prevdataoncontext)=>({
          ...prevdataoncontext,
          examid:examid,
      }))
        
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
  if(dataoncontext.login!=true){
    router.push("/Auth/user-login");
  }else{

  
  return (
    <div>
    



      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800">Exams: {Exams.title}</h1>
        <p className="text-gray-600 mt-4">{Exams.description}</p>
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-800 text-lg">
              Total Marks: <span className="font-semibold">{Exams.total_marks}</span>
            </p>
            <p className="text-gray-800 text-lg">
              Duration: <span className="font-semibold">{Exams.duration} minutes</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/Rules`)}
          className="mt-8 w-full bg-darkblue text-black py-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Start Exam
        </button>
      </div>
    </div>






    </div>




  );
}
}
