// pages/login.js
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useData } from '@/app/context/dataContext';
import React, { useState } from 'react';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const {setdataoncontext}=useData();
  const [password, setPassword] = useState('');
  const [Message, setMessage] = useState("");
  const router=useRouter();
  const handleLogin =async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    try{
      const data=await axios.post("http://localhost:8080/auth/login/examiner",{
        email,
        password
      });
      const token=data.data;
      localStorage.setItem("jwtToken", token);
      // console.log(data);
      //const decodejwt=jwtDecode(localStorage.getItem("jwtToken"));
      setdataoncontext({
        login:true,
        email:email,
      })
      router.push("/Dashboard/examiner");
    }catch(err){
      setMessage("Login Failed! . Check you Credentials")
      console.log("error", err);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
        <h3 className='text-red-600'>{Message}</h3>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/Auth/examiner-signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
