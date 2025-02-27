import { useNavigate } from "react-router-dom"; 
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import "./dashboard.css";

export const StudentDashboard = () => {
  const { data: classrooms, isLoading, isError } = useGetAllClassroomsQuery();
  const navigate = useNavigate(); 

  const classroomsData = Array.isArray(classrooms?.classrooms) ? classrooms.classrooms : [];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleStudentClick = (studentId, classroomId) => {
    navigate(`/student/${studentId}/attendance?classroom=${classroomId}`); // Navigate to attendance page
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Class Dashboard</h2>

      {isLoading && <p className="loading-text">Loading classrooms...</p>}
      {isError && <p className="error-text">Error loading classrooms</p>}

      {!isLoading && !isError && classroomsData.length === 0 && (
        <p className="no-classrooms-text">No classrooms available</p>
      )}

      {classroomsData.map((classroom) => {
        const classroomTeacher = classroom.teachers?.find(teacher => teacher.isClassroom_Teacher) || null;
        const totalStudents = classroom.students?.length || 0;

        return (
          <div key={classroom._id} className="classroom-card">
            <div className="class-details">
              <img
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GoogleClassroom.width-700.format-webp.webp"
                alt="Classroom"
              />
              <div className="teacher-info">
                <h3>Name: {classroom.name}</h3>
                <div className="class-detail">
                  {classroomTeacher && (
                    <div>
                      <p>Class Teacher</p>
                      <h3>{classroomTeacher.fullName}</h3>
                    </div>
                  )}
                  <div>
                    <p>Total Number of Students</p>
                    <span>{totalStudents}</span>
                  </div>
                </div>
              </div>
            </div>

            {totalStudents > 0 ? (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Student ID</th>
                    <th>Parent</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {classroom.students.map((student) => (
                    <tr key={student._id} onClick={() => handleStudentClick(student._id, classroom._id)}>
                      <td>{student.fullName || "N/A"}</td>
                      <td>{student.gender || "N/A"}</td>
                      <td>{formatDate(student.DOB)}</td>
                      <td>{student._id || "N/A"}</td>
                      <td>{student.parent || "N/A"}</td>
                      <td>{student.phone || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-students-text">No students enrolled</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
