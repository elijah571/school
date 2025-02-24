import { useParams, useLocation } from "react-router-dom";
import { useGetStudentAttendanceQuery } from "../../redux/api/attendanceSlice"; 
import "./studentAttendance.css";

export const GetStudentAttendance = () => {
  const { id: studentId } = useParams(); // Extract studentId from the URL params
  const { search } = useLocation(); // Extract query string
  const classroomId = new URLSearchParams(search).get("classroom"); // Extract classroomId

  console.log("Student ID:", studentId);
  console.log("Classroom ID:", classroomId);

  const { data: attendanceData, isLoading, isError } = useGetStudentAttendanceQuery({ studentId, classroomId });

  console.log("Attendance Data:", attendanceData);

  if (isLoading) return <p>Loading attendance...</p>;
  if (isError) return <p>Error loading attendance data.</p>;

  // Ensure attendance exists
  const attendance = attendanceData?.studentAttendance;
  if (!attendance || attendance.length === 0) {
    return <p>No attendance data available</p>;
  }

  return (
    <div className="attendance-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => {
            const date = record.date ? new Date(record.date).toLocaleDateString() : "N/A";
            const checkIn = record.checkIn && record.checkIn !== "N/A" ? record.checkIn : "Not Recorded";
            const checkOut = record.checkOut && record.checkOut !== "N/A" ? record.checkOut : "Not Recorded";

            return (
              <tr key={index}>
                <td>{date}</td>
                <td>{checkIn}</td>
                <td>{checkOut}</td>
                <td>{record.status || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
