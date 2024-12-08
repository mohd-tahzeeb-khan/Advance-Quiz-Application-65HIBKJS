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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Exams for Course:dgs </h1>
      {/* {course.name} */}
      <p>srgaidfgkdfgdkfgjdgjeiodfjsd</p>
      {/* {course.description} */}

      <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Exam Name</th>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Result</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td style={{ padding: '10px' }}>{exam.name}</td>
              <td style={{ padding: '10px' }}>{new Date(exam.date).toLocaleDateString()}</td>
              <td style={{ padding: '10px' }}>{exam.result || 'Not Taken Yet'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <Link href={`/course/${courseId}`}>
          <a style={{ color: 'blue', textDecoration: 'underline' }}>Back to Course</a>
        </Link>
      </div>
    </div>
  );
};

export default ExamsPage;
