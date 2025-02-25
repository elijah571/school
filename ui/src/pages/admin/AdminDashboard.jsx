import './adminDashboard.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import StudentForm from "../../components/studentDashboard/StudentForm";
import { AiOutlinePlus } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { useGetTeachersQuery } from '../../redux/api/teacherSlice';
import TeacherForm from '../../components/teachersDashboard/TeachersForm';
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <h2>Access Denied</h2>;
  }

  // Fetch all classroom data
  const { data: classroomData, isLoading: classroomLoading, error: classroomError } = useGetAllClassroomsQuery();

 
  // Fetch teacher data
  const { data: teacherData, isLoading: teacherLoading, error: teacherError, refetch: refetchTeachers } = useGetTeachersQuery();
  const teachers = teacherData?.teachers || [];

  // Separate toggles for teachers and students
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showTeacherNav, setShowTeacherNav] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showStudentNav, setShowStudentNav] = useState(false);

  const toggleTeacherForm = () => {
    setShowTeacherForm(!showTeacherForm);
  };

  const toggleTeacherNav = () => {
    setShowTeacherNav(!showTeacherNav);
  };

  const toggleStudentForm = () => {
    setShowStudentForm(!showStudentForm);
  };

  const toggleStudentNav = () => {
    setShowStudentNav(!showStudentNav);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const classroom = classroomData?.classrooms[0]; // Assuming you're only showing the first classroom
  const classroomTeacher = classroom?.teacher || {}; // Teacher info from classroom

  // Total Students
  const totalStudents = classroomData?.classrooms?.reduce((acc, classroom) => acc + classroom.students.length, 0) || 0;

  // Total Teachers
  const totalTeachers = teachers.length || 0;

  // Total Classes
  const totalClasses = classroomData?.classrooms?.length || 0;

  const navigate = useNavigate()
  const handleStudentClick = (studentId, classroomId) => {
    navigate(`/student/${studentId}/attendance?classroom=${classroomId}`); // Navigate to attendance page
  };
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Total Numbers Section */}
      

      {/* Class Details */}
      {classroom && (
        <div key={classroom._id} className="class-details">
          <img src={'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GoogleClassroom.width-700.format-webp.webp'} alt="Classroom" />
          {classroomTeacher && (
            <div className="teacher-info">
              <h3>Name: {classroom.name}</h3>
              <div className="class-detail">
                <div>
                <h3>Principal</h3>
                <span>Elijah Peter</span>
                </div>
                <div>
                  <p>Total Number of Students</p>
                  <span>{totalStudents}</span>
                </div>
                <div>
                <h3>Total Teachers</h3>
                <span>{totalTeachers}</span>
                </div>
                <div>
                <h3>Total Classes</h3>
                <span>{totalClasses}</span>
                </div>
                <div>
                  <p>Term</p>
                  <span>{classroom.term}</span>
                </div>
                <div>
                  <p>Academic Year</p>
                  <span>{classroom.year}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Teacher Section */}
      <div className="class">
        <h3>Teachers Information</h3>
        <div className="icon-controls">
          <div className="bar-icon" onClick={toggleTeacherNav}>
            <FaBars size={20} color="#333" />
          </div>
          <div className="plus-icon" onClick={toggleTeacherForm}>
            <span>Add Teacher</span>
            <AiOutlinePlus size={20} color="#fff" />
          </div>
        </div>
      </div>

      {showTeacherNav && (
        <nav className="admin-dashboard-nav">
          <Link to="/admin/create-classroom">Create Classroom</Link>
          <Link to="/admin/assign-teacher">Assign Teacher</Link>
        </nav>
      )}

      {showTeacherForm && (
        <div className="teacher-form-container">
          <TeacherForm onSuccess={() => { refetchTeachers(); setShowTeacherForm(false); }} />
        </div>
      )}

      {/* Display Teacher List */}
      <section className="teachers-section">
        {teacherLoading ? (
          <p>Loading teachers...</p>
        ) : teacherError ? (
          <p className="error-message">Error: {teacherError.message}</p>
        ) : (
          <div className="table-responsive">
            <table className="teachers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Teacher ID</th>
                  <th>Email</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher.fullName}</td>
                    <td>{teacher.gender}</td>
                    <td>{teacher._id || "N/A"}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Student Section */}
      <div className="class">
        <h3>Student Information</h3>
        <div className="icon-controls">
          <div className="bar-icon" onClick={toggleStudentNav}>
            <FaBars size={20} color="#333" />
          </div>
          <div className="plus-icon" onClick={toggleStudentForm}>
            <span>Add Student</span>
            <AiOutlinePlus size={20} color="#fff" />
          </div>
        </div>
      </div>

      {showStudentNav && (
        <nav className="admin-dashboard-nav">
          <Link to="/admin/create-classroom">Create Classroom</Link>
          <Link to="/admin/assign-students">Assign Students</Link>
        </nav>
      )}

      {showStudentForm && (
        <div className="student-form-container">
          <StudentForm onSuccess={() => { refetchStudents(); setShowStudentForm(false); }} />
        </div>
      )}

<section className="students-section">
  <div className="table-responsive">
    {classroomLoading ? (
      <p>Loading classrooms...</p>
    ) : classroomError ? (
      <p className="error-message">Error: {classroomError.message}</p>
    ) : classroom && classroom.students.length === 0 ? (
      <p>No students available in this classroom</p>
    ) : classroom ? (
      <table className="students-table">
        <thead>
          <tr>
            {/* <th>Profile</th> */}
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
              {/* <td>
                <img src={student.image} alt={student.fullName} width="50" />
              </td> */}
              <td>{student.fullName}</td>
              <td>{student.gender}</td>
              <td>{formatDate(student.DOB)}</td>
              <td>{student._id || "N/A"}</td>
              <td>{student.parent}</td>
              <td>{student.phone || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No classroom data available</p>
    )}
  </div>
</section>


    </div>
  );
};

export default AdminDashboard;
