'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ExamsPage = ({ course, exams }) => {
  const router = useRouter();
  //const { courseId } = router.query;

//   if (!course || !exams) {
//     return <p>Loading...</p>;
//   }

    return (
      <div className="p-5 font-sans">
        <h1 className="text-2xl font-bold mb-4">Exams for Course: Python Programming</h1>
        {/* {course.name} */}
        <p className="text-gray-700 mb-6">This is the Main source of the Java for Infinite Code.</p>
        {/* {course.description} */}
  
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border border-gray-300">Exam Name</th>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Result</th>
            </tr>
          </thead>
          <tbody>
            {/* {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{exam.name}</td>
                <td className="p-3 border border-gray-300">{new Date(exam.date).toLocaleDateString()}</td>
                <td className="p-3 border border-gray-300">{exam.result || 'Not Taken Yet'}</td>
              </tr>
            ))} */}
            <tr className="hover:bg-gray-100">
              <td className="p-3 border border-gray-300">Python Programming</td>
              <td className="p-3 border border-gray-300">10/1/2024</td>
              <td className="p-3 border border-gray-300">Results</td>
            </tr>
          </tbody>
        </table>
  
        <div className="mt-6">
          {/* <Link href={`/course/${courseId}`}> */}
          <Link className="text-blue-500 hover:underline" href={`/course/3s`}>
            Back to Course
          </Link>
        </div>
      </div>
    );
}

export default ExamsPage;
