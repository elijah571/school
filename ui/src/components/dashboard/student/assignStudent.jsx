import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetAllStudentsQuery, useDeleteStudentMutation } from "../../../redux/api/studentSlice";
import AssignStudentModal from "../../modal/AssignStudentModel";


const AssignStudents = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <h2>Access Denied</h2>;
  }

  const { data, isLoading, error, refetch } = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [studentToAssign, setStudentToAssign] = useState(null);

  // Safely get the list of students from the API response.
  const students = data?.students || data || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      refetch();
    }
  };

  const openAssignModal = (studentId) => {
    setStudentToAssign(studentId);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setStudentToAssign(null);
    setShowAssignModal(false);
    refetch();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
 
  return (
    <div className="admin-dashboard-container">
     

      <section className="students-section">
        <h2>Asign Student To Classroom</h2>
        {/* Include the StudentForm for adding/updating students */}

        {isLoading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="error-message">Error: {error.message}</p>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Student ID</th>
                <th>Parent</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                
                  <td>{student.fullName}</td>
                  <td>{student.gender}</td>
                  <td>{formatDate(student.DOB)}</td>
                  <td>{student._id || "N/A"}</td>
                  <td>{student.parent}</td>
                  <td>{student.phone || "N/A"}</td>
                  <td>
                    <button className="assign-btn" onClick={() => openAssignModal(student._id)}>
                      Assign
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showAssignModal && (
          <AssignStudentModal
            studentId={studentToAssign}
            onClose={closeAssignModal}
            onAssignSuccess={closeAssignModal}
          />
        )}
      </section>
    </div>
  );
};

export default AssignStudents;
