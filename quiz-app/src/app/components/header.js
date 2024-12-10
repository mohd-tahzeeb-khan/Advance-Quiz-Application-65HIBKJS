'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useData } from "../context/dataContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dataoncontext }=useData();
  return (
    <nav className="bg-slate-700 shadow-lg h-16 border-b-2 border-b-white border-t-2 border-t-white pt-2">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <Link href="/">
            QuizApp
          </Link>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link className="text-white hover:text-gray-300" href="/">
            Home
          </Link>
          <Link className="text-white hover:text-gray-300" href="/about">
            About
          </Link>
          <Link className="text-white hover:text-gray-300" href="/Courses">
            Quizzes
          </Link>
          <Link className="text-white hover:text-gray-300" href="/contact">
            Contact
          </Link>
          
        </div><div className="text-white">
                <h3>{dataoncontext.name|| <div>
                <Link className="bg-green-500 text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mr-2" href="/Auth/user-login">
                  Login
                </Link>
                <Link className="bg-green-700 text-blue-600 px-4 py-2 rounded hover:bg-white" href="/Auth/user-signup">
                 Sign Up
                </Link>
              </div> }</h3>
              </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link className="text-white hover:text-gray-300" href="/">
              Home
            </Link>
            <Link className="text-white hover:text-gray-300" href="/about">
              About
            </Link>
            <Link className="text-white hover:text-gray-300" href="/quizzes">
              Quizzes
            </Link>
            <Link className="text-white hover:text-gray-300" href="/contact">
              Contact
            </Link>
            <div>
              <Link className="bg-green-500 text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mr-2" href="/Auth/user-login">
                Login
              </Link>
              <Link className="bg-green-700 text-blue-600 px-4 py-2 rounded hover:bg-white" href="/Auth/user-signup">
               Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
    
  
  
};

export default Navbar;
