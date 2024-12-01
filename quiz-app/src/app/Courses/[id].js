import { useRouter } from "next/router";

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulating course data, or you could fetch data based on the id
  const courseData = {
    1: { title: "JavaScript for Beginners", description: "Learn the basics of JavaScript" },
    2: { title: "React Fundamentals", description: "Master React for building modern web applications" },
    3: { title: "Full Stack Web Development", description: "Become a full-stack developer" },
    4: { title: "Advanced Node.js", description: "Deep dive into Node.js and backend development" },
  };

  const course = courseData[id];

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseDetail;
