'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '../context/dataContext';

export default function RulesPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();
  const { dataoncontext }=useData();
  const {setdataoncontext}=useData();
  // Function to handle agreement
  const handleAgree = () => {
    setdataoncontext((prevdataoncontext)=>({
      ...prevdataoncontext,
      rules:true,
  }))
    setIsAgreed(true);
  };

  // Function to start the exam
  const handleStartExam = () => {
    if (isAgreed) {
      // Redirect to the exam page, replace with the actual exam page URL
      router.push('/mcQuestions');
    }
  };

  return (
    <div className='h-[100vh] w-full mt-[10%] '>
    <div className="rules-page-container text-black ">
      <h1 className="text-center text-xl font-bold mb-4">Exam Rules</h1>

      <div className="rules-content mb-6">
        <ul className='text-black'>
          <li>1. You must complete the exam in one sitting.</li>
          <li>2. No external assistance is allowed during the exam.</li>
          <li>3. You must answer all questions.</li>
          <li>4. No cheating or plagiarism is allowed.</li>
          <li>5. Ensure your internet connection is stable before starting.</li>
          <li>6. Follow the instructions given during the exam.</li>
          <li>{dataoncontext.examid}</li>
        </ul>
      </div>

      <div className="flex justify-between items-center">
        {/* Agree Button */}
        <button 
          className="px-4 py-2 bg-green-500 text-white font-bold rounded" 
          onClick={handleAgree}
          disabled={isAgreed}
        >
          {isAgreed ? 'You have agreed' : 'Agree to the rules'}
        </button>

        {/* Start Exam Button */}
        <button 
          className={`px-6 py-2 bg-blue-500 text-white font-bold rounded bg-green-500 ${isAgreed ? '' : 'opacity-50 cursor-not-allowed bg-black'}`}
          onClick={handleStartExam}
          disabled={!isAgreed}
        >
          Start Exam
        </button>
      </div>
      </div>
      
      <style jsx>{`
        .rules-page-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .rules-content ul {
          list-style-type: decimal;
          padding-left: 20px;
        }

        .rules-content li {
          margin-bottom: 8px;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
