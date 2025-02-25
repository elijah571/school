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
        <div className="student-details">
          <div>
          <h6> {student.fullName}</h6>

          </div>
          <div className="student-info">
          <p><span>Class</span>SS3A</p>
          <p><span>Gender</span> {student.gender}</p>
          <p><span>Date of Birth</span> {formatDate(student.DOB)}</p>
          <p><span>Student ID</span> {student._id}</p>
          <p><span>Academic Year</span> 2024/2025</p>
          <p><span>Parent</span> {student.parent}</p>
          <p><span>Parent Contact</span> {student.phone}</p>
          </div>
          
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
