// src/components/AssignStudentModal.jsx
import  { useState } from "react";
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import { useAssignStudentsToClassroomMutation } from "../../redux/api/classRoomSlice";
import './assigmentModel.css'
const AssignStudentModal = ({ studentId, onClose, onAssignSuccess }) => {
  // Fetch all classrooms
  const { data: classroomsData, isLoading: classroomsLoading, error: classroomsError } =
    useGetAllClassroomsQuery();

  // State to store selected classroom
  const [selectedClassroom, setSelectedClassroom] = useState("");

  // Use the assignStudentsToClassroom mutation from your classroom API slice
  const [assignStudents, { isLoading: assigning, error: assignError }] =
    useAssignStudentsToClassroomMutation();

  const handleAssign = async () => {
    if (!selectedClassroom) {
      alert("Please select a classroom");
      return;
    }
    try {
      // API expects studentIds as an array
      await assignStudents({ classroomId: selectedClassroom, studentIds: [studentId] }).unwrap();
      onAssignSuccess();
      onClose();
    } catch (err) {
      alert("Error assigning student: " + (err?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Assign Student to Classroom</h3>
        {classroomsLoading ? (
          <p>Loading classrooms...</p>
        ) : classroomsError ? (
          <p>Error loading classrooms</p>
        ) : (
          <select
            value={selectedClassroom}
            onChange={(e) => setSelectedClassroom(e.target.value)}
          >
            <option value="">Select Classroom</option>
            {classroomsData?.classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.name}
              </option>
            ))}
          </select>
        )}
        <div className="modal-buttons">
          <button onClick={handleAssign} disabled={assigning}>
            {assigning ? "Assigning..." : "Assign"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
        {assignError && <p style={{ color: "red" }}>Error: {assignError.message}</p>}
      </div>
    </div>
  );
};

export default AssignStudentModal;
