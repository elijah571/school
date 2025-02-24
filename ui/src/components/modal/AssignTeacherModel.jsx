import { useState } from "react";
import { useGetAllClassroomsQuery, useAssignTeacherToClassroomMutation } from "../../redux/api/classRoomSlice";
import "./assigmentModel.css";
const AssignTeacherModal = ({ teacherId, onClose, onAssignSuccess }) => {
  // Fetch all classrooms
  const { data: classroomsData, isLoading: classroomsLoading, error: classroomsError } =
    useGetAllClassroomsQuery();

  // State to store selected classroom
  const [selectedClassroom, setSelectedClassroom] = useState("");

  // Use the assignTeacherToClassroom mutation from your classroom API slice
  const [assignTeacher, { isLoading: assigning, error: assignError }] =
    useAssignTeacherToClassroomMutation();

  const handleAssign = async () => {
    const trimmedClassroomId = selectedClassroom.trim();
    const trimmedTeacherId = teacherId && teacherId.trim();

    if (!trimmedClassroomId) {
      alert("Please select a classroom");
      return;
    }
    if (!trimmedTeacherId) {
      alert("Teacher ID is missing");
      return;
    }
    console.log("Assigning teacher:", trimmedTeacherId, "to classroom:", trimmedClassroomId);
    try {
      await assignTeacher({ classroomId: trimmedClassroomId, teacherId: trimmedTeacherId }).unwrap();
      onAssignSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error assigning teacher: " + (err?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Assign Teacher to Classroom</h3>
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

export default AssignTeacherModal;