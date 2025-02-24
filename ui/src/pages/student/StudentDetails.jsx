import { Outlet, Link, useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../redux/api/studentSlice";
import "./studentDetails.css";
import { Student } from "../../components/studentDashboard/Student";

export const StudentDetails = () => {
  const { id } = useParams();
  const { data: student, isLoading, isError } = useGetStudentByIdQuery(id);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (isLoading) return <p>Loading details...</p>;
  if (isError) return <p>Error fetching student details.</p>;

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>
      {student ? (
        <div>
          <p><strong>Name:</strong> {student.fullName}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {formatDate(student.DOB)}</p>
          <p><strong>Parent:</strong> {student.parent}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
        </div>
      ) : (
        <p>No details available</p>
      )}

      {/* Navigation Links */}
      <nav>
        <Link to="">Report</Link> |  
        <Link to={`attendance?classroom=${student.classroomId}`}>Attendance</Link>
      </nav>

      {/* Renders either Student Report or Attendance */}
      <Outlet />
      <Student/>
    </div>
  );
};
