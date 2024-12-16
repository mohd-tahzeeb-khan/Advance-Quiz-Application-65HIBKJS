'use client'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies';
const ExamsPage = () => {
  const router = useRouter();
  const [examsData, setExamsData] = useState([]);
  const [name, setname] = useState("");
  const {id}=useParams();
  const handleDeleteExam=async(examid)=>{
    try {
      const response = await axios.delete(`http://localhost:8080/exam/delete/${examid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json'
        }
      });
        } catch (error) {
          alert(error);
      console.log('Error fetching exams:');
    }
  }
  const handleCreateQuestions=(examid)=>{
    router.push(`/mcQuestions/${examid}`);
  }
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/course/getbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json'
          }
        });
        setExamsData(response.data.exams);
        setname(response.data.name);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);
  //const { courseId } = router.query;

//   if (!course || !exams) {
//     return <p>Loading...</p>;
//   }

    return (
      <div className="p-5 font-sans">
        <h1 className="text-2xl font-bold mb-4">Exams for Course:  {name}</h1>
  
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border border-gray-300">Exam Name</th>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Result</th>
              <th className="p-3 border border-gray-300">Options</th>
            </tr>
          </thead>
          <tbody>
            {examsData.map((exams) => (
              <tr key={exams.exam_id} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{exams.title}</td>
                <td className="p-3 border border-gray-300">{new Date(exams.date).toLocaleDateString()}</td>
                <td className="p-3 border border-gray-300">{exams.result || 'Not Taken Yet'}</td>
                <td className="p-3 border border-gray-300"><button
                      onClick={() => handleCreateQuestions(exams.exam_id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 m-2"
                    >
                      Alter Questions
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exams.exam_id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 m-2"
                    >
                      Delete
                    </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="mt-6">
          {/* <Link href={`/course/${courseId}`}> */}
          <Link className="text-blue-500 hover:underline" href={`/Dashboard/examiner`}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
}

export default ExamsPage;
