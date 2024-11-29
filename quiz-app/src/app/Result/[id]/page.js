'use client'

import { useEffect, useState } from "react"

export default function ResultPage({ params }) {
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (params) {
      setScore(params.id || 0)
      setTotalQuestions(params.id || 0)
      // Calculate percentage
      const calculatedPercentage = (params.id / params.id) * 100
      setPercentage(calculatedPercentage)
    }
  }, [params])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Exam Results
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">Score</h2>
                <p className="text-3xl font-bold text-blue-600">{score}</p>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">Total Questions</h2>
                <p className="text-3xl font-bold text-blue-600">{totalQuestions}</p>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">Percentage</h2>
                <p className="text-3xl font-bold text-blue-600">{percentage.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            {percentage >= 70 ? (
              <div className="text-green-600">
                <h3 className="text-2xl font-bold">Congratulations! You Passed!</h3>
                <p className="mt-2">Well done on achieving a passing score.</p>
              </div>
            ) : (
              <div className="text-red-600">
                <h3 className="text-2xl font-bold">Keep Practicing!</h3>
                <p className="mt-2">You need 70% or higher to pass. Try again!</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
