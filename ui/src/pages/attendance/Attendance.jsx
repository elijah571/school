import { useState } from "react";
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import { useMarkAttendanceMutation } from "../../redux/api/attendanceSlice"; 
import './attendance.css'
import { useSelector } from "react-redux";
export const Attendance = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <h2>Access Denied</h2>;
  }
  // Fetch classrooms data
  const { data: classrooms, isLoading, isError } = useGetAllClassroomsQuery();
  
  // Mutation hook for marking attendance
  const [markAttendance, { isLoading: isSubmitting }] = useMarkAttendanceMutation();

  // Ensure classroomsData is always an array
  const classroomsData = Array.isArray(classrooms?.classrooms) ? classrooms.classrooms : [];

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
  };

  // State to track attendance selection
  const [attendance, setAttendance] = useState({});

  // Handle attendance selection
  const handleAttendanceChange = (studentId, field, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  // Submit attendance
  const handleSubmit = async (classroomId) => {
    try {
      const attendanceData = Object.entries(attendance).map(([student, details]) => ({
        student,
        status: details.status,
        checkIn: details.status !== "absent" ? details.checkIn || "" : undefined,
        checkOut: details.status !== "absent" ? details.checkOut || "" : undefined,
      }));

      await markAttendance({ classroomId, attendanceStatus: attendanceData }).unwrap();
      alert("Attendance marked successfully!");
    } catch (err) {
      console.error("Error marking attendance:", err);

      // Show error message as alert
      if (err?.data?.message) {
        alert(`Error: ${err.data.message}`);
      } else {
        alert("Failed to mark attendance. Please try again.");
      }
    }
  };

  if (isLoading) return <p>Loading classrooms...</p>;
  if (isError) return <p>Error fetching classrooms.</p>;

  return (
    <div className="attendance-container">
      {classroomsData.map((classroom) => (
        <div key={classroom._id} className="classroom-container">
          <h2 >Mark Attendace</h2>

          {classroom.students && classroom.students.length > 0 ? (
            <div className='table-div'>
                <table className="attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Student ID</th>
                  <th>Attendance</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {classroom.students.map((student, index) => (
                  <tr key={`${student._id}-${index}`} className="student-row">
                    <td>{student.fullName}</td>
                    <td>{student.gender}</td>
                    <td>{formatDate(student.DOB)}</td>
                    <td>{student._id || "N/A"}</td>
                    <td className="attendance-input">
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student._id}`}
                          value="present"
                          onChange={() => handleAttendanceChange(student._id, "status", "present")}
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student._id}`}
                          value="absent"
                          onChange={() => handleAttendanceChange(student._id, "status", "absent")}
                        />
                        Absent
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student._id}`}
                          value="late"
                          onChange={() => handleAttendanceChange(student._id, "status", "late")}
                        />
                        Late
                      </label>
                    </td>
                    <td>
                      {attendance[student._id]?.status !== "absent" && (
                        <input
                          type="time"
                          onChange={(e) => handleAttendanceChange(student._id, "checkIn", e.target.value)}
                        />
                      )}
                    </td>
                    <td>
                      {attendance[student._id]?.status !== "absent" && (
                        <input
                          type="time"
                          onChange={(e) => handleAttendanceChange(student._id, "checkOut", e.target.value)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          
          ) : (
            <p className="no-students-text">No students enrolled</p>
          )}

          <button
            className="submit-button"
            onClick={() => handleSubmit(classroom._id)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      ))}


    </div>
  );
};
