import { useGetAttendanceForClassroomQuery } from "../../redux/api/attendanceSlice";
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";

export const AttendanceList = () => {
  // Fetch all classrooms
  const { data: classrooms, isLoading: isClassroomsLoading, isError: isClassroomsError } = useGetAllClassroomsQuery();

  // Logging classroom data
  // console.log("Classrooms data:", classrooms);

  // Loading and error handling for classrooms
  if (isClassroomsLoading) return <p>Loading classrooms...</p>;
  if (isClassroomsError) return <p>Error fetching classrooms.</p>;

  // Ensure classrooms data is an array
  const classroomsData = Array.isArray(classrooms?.classrooms) ? classrooms.classrooms : [];

  return (
    <div>
      <h2>Classrooms and Attendance</h2>

      {classroomsData.length > 0 ? (
        classroomsData.map((classroom) => (
          <div key={classroom._id}>
            <h3>{classroom.name}</h3>
            {/* Fetch and display attendance for each classroom */}
            <AttendanceForClassroom classroomId={classroom._id} />
          </div>
        ))
      ) : (
        <p>No classrooms available.</p>
      )}
    </div>
  );
};

// Component to display attendance for a specific classroom
const AttendanceForClassroom = ({ classroomId }) => {
  // Fetch attendance data for the specific classroom
  const { data: attendanceData, isLoading, isError } = useGetAttendanceForClassroomQuery(classroomId);

  // Logging attendance data
  // console.log(`Attendance data for classroom ${classroomId}:`, attendanceData);

  // Loading and error handling
  if (isLoading) return <p>Loading attendance data...</p>;
  if (isError) return <p>Error fetching attendance data.</p>;

  // Ensure attendanceData contains the correct structure
  const attendanceRecords = Array.isArray(attendanceData?.attendance?.attendanceStatus) 
    ? attendanceData.attendance.attendanceStatus 
    : [];

  // Logging attendance records to check if they are being correctly fetched
  // console.log("Attendance records:", attendanceRecords);

  return (
    <div>
      {attendanceRecords.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
             
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.student._id}</td>
                <td>{record.student.fullName}</td>
                <td>{record.status}</td>
                <td>{record.checkIn || "N/A"}</td>
                <td>{record.checkOut || "N/A"}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found for this classroom.</p>
      )}
    </div>
  );
};
