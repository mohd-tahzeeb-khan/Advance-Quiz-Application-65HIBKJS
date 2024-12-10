'use client'
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useData } from '@/app/context/dataContext';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Static user data, replace with actual user data from an API
  const userData = {
    
  };
  const {setdataoncontext}=useData();
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    totalExams: 5,
    mobile:"",
    city:"",
    state:"",
    zip:"",
    noofexams:"",
    examsResults: [{
      
  },  
  ]
  })
  // const [results, setresults] = useState({
  //   examsResults: [{
  //       exam:  "---",
  //       score: "--"
  //   },  
  //   ]
  // })

  // ----------------------------------------------------------------

  
  

  // ----------------------------------------------------------------
useEffect(() => {
  const fetchdata=async ()=>{


    const configheader={
      // jwttToken:localStorage.getItem("jwtToken"),
      headers:{
        Authorization:`Bearer ${localStorage.getItem('jwtToken')}`,
        "Content-Type":"application/json"
    },};
    try{
      const userdataget=await axios.get("http://localhost:8080/user/getuser", configheader)
      const data=userdataget.data;
      console.log("data",data);
      setuserdata({
        name:data.name,
        email:data.email,
        totalExams:5,
        mobile:data.mobile,
        city:data.city,
        zip:data.zip,
        state:data.state,
        noofexams:65,
        examsResults:
          data.exams
      });
      setdataoncontext({
        name:data.name,
        login:true,
        email:data.email,
      })
      // const resultis={
      //   examsResults:[{
      //     exam:"tahzeeb",
      //     score:55,
      //   }
          
      //   ] 
      // }
    }catch(Error ){
      console.error(Error);

    }
    };
    fetchdata();
}, [])


 
  // Prepare data for the progress chart
  // const scores = userData.examsResults.map(result => result.score);
  // const examNames = userData.examsResults.map(result => result.exam);

  // const chartData = {
  //   labels: userdata.examsResults,
  //   datasets: [
  //     {
  //       label: "Exam Scores",
  //       data: userdata.examsResults.total_marks,
  //       fill: false,
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  // State to handle personal information and results
  const [user, setUser] = useState(userData);

  // You can replace this with an API call to fetch user data
  // useEffect(() => {
  //   // Mock API call to fetch user data
  //   // In real-world scenarios, you would fetch this data from a server
  //   setUser(userData);
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">User Dashboard</h1>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <p className="text-gray-600 mt-2">Name: {userdata.name}</p>
          <p className="text-gray-600">Email: {userdata.email}</p>
          <p className="text-gray-600 mt-2">Mobile: {userdata.mobile}</p>
          <p className="text-gray-600">City: {userdata.city}</p>
          <p className="text-gray-600 mt-2">state: {userdata.state}</p>
          <p className="text-gray-600">zip: {userdata.zip}</p>
        
        </div>

        {/* Total Exams and Results */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Exam Results</h2>
          <p className="text-gray-600 mt-2">Total Exams Taken: {userdata.noofexams}</p>
          {/* <div className="mt-4">
              {userdata.examsResults.map((exam) => (
              <div key={exam.exams_id} className="flex justify-between mb-2">
               <div className="w-[100%] flex justify-between border-2 border-black p-4">
                <span className="text-gray-800" key={exam.exams_id}>{exam.title}</span>
                <span className="text-gray-600" key={exam.exams_id}>{exam.description}</span>
                <span className="text-gray-600" key={exam.exams_id}>{exam.total_marks}%</span>
               </div>
                    
               
              </div>))}
          </div> */}
        </div>

        {/* Progress Chart  */}
         {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Progress Chart</h2>
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
