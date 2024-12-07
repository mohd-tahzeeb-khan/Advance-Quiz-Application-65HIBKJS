import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to QuizApp!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            The ultimate platform for managing quizzes seamlessly. Perfect for students and educators.
          </p>
          <div className="space-x-4">
            <Link className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-100 font-medium text-black" href="/signup">
              
                Get Started
              
            </Link>
            <Link className="text-black bg-gray-100 text-blue-600 px-6 py-3 rounded hover:bg-white font-medium" href="/about">
              
                Learn More
              
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Features of QuizApp</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-500  shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">MCQ-Based Tests</h3>
              <p>
                Create, take, and evaluate multiple-choice quizzes effortlessly.
              </p>
            </div>
            <div className="bg-slate-500  shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p>
                Separate dashboards for students and educators for better usability.
              </p>
            </div>
            <div className="bg-slate-500  shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p>
                Track performance and results in real-time with detailed insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Test?</h2>
          <p className="mb-6">
            Sign up today and Create your quiz experience to the next level.
          </p>
          <Link className="m-3 bg-white text-extradarkblue font-bold px-6 py-3 rounded hover:bg-gray-100" href="/Auth/examiner-signup">
            
              Sign Up Now
           
          </Link>
          <Link className="m-3 bg-white text-extradarkblue font-bold px-6 py-3 rounded hover:bg-gray-100" href="/Auth/examiner-login">
            
              Sign In Now
           
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-700">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-500 shadow-lg rounded-lg p-6">
              <p className="italic">
                "QuizApp makes managing tests a breeze. Highly recommended!"
              </p>
              <span className="block mt-4 font-bold">- Student</span>
            </div>
            <div className="bg-slate-500  shadow-lg rounded-lg p-6">
              <p className="italic">
                "I love how easy it is to create and analyze quizzes."
              </p>
              <span className="block mt-4 font-bold">- Teacher</span>
            </div>
            <div className="bg-slate-500  shadow-lg rounded-lg p-6">
              <p className="italic">
                "Perfect tool for educators to simplify the quiz process."
              </p>
              <span className="block mt-4 font-bold">- Organization</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
