'use client'
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
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
          <Link className="text-white hover:text-gray-300" href="/quizzes">
            Quizzes
          </Link>
          <Link className="text-white hover:text-gray-300" href="/contact">
            Contact
          </Link>
          <div>
            <Link className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mr-2" href="/login">
             Login
            </Link>
            <Link className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-white" href="/signup">
             Sign Up
            </Link>
          </div>
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
              <Link className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mr-2" href="/login">
                Login
              </Link>
              <Link className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-white" href="/signup">
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
