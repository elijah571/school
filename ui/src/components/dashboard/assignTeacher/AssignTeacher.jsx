import { useSelector } from "react-redux";
import { useGetTeachersQuery, useDeleteTeacherMutation } from "../../../redux/api/teacherSlice";
import AssignTeacherModal from "../../modal/AssignTeacherModel";
import { useState } from "react";
import "./assignTeacher.css";

const AssignTeacher = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <h2>Access Denied</h2>;
  }

  const { data, isLoading, error, refetch } = useGetTeachersQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [teacherToAssign, setTeacherToAssign] = useState(null);

  // Safely get the list of teachers from the API response.
  const teachers = data?.teachers || data || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      await deleteTeacher(id);
      refetch();
    }
  };

  const openAssignModal = (teacherId) => {
    setTeacherToAssign(teacherId);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setTeacherToAssign(null);
    setShowAssignModal(false);
    refetch();
  };

  return (
    <div className="admin-dashboard-container">
      <section className="teachers-section">
        <h2>Assign Teacher To Classroom</h2>

        {isLoading ? (
          <p>Loading teachers...</p>
        ) : error ? (
          <p className="error-message">Error: {error.message}</p>
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
                  <th>Actions</th>
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
                    <td>
                      <button className="assign-btn" onClick={() => openAssignModal(teacher._id)}>
                        Assign
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(teacher._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAssignModal && (
          <AssignTeacherModal
            teacherId={teacherToAssign}
            onClose={closeAssignModal}
            onAssignSuccess={closeAssignModal}
          />
        )}
      </section>
    </div>
  );
};

export default AssignTeacher;

