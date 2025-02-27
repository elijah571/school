import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import "./teacher.css";

export const Teacher = () => {
    const { data: classrooms, isLoading, isError } = useGetAllClassroomsQuery();

    // Ensure classroomsData is always an array
    const classroomsData = Array.isArray(classrooms?.classrooms) ? classrooms.classrooms : [];

    // Extract all teachers dynamically
    const teachersData = classroomsData.flatMap(classroom =>
        Array.isArray(classroom.teachers)
            ? classroom.teachers.map(teacher => ({ ...teacher, classroomName: classroom.name }))
            : []
    );

    return (
        <div className="teacher-container">
            {isLoading && <p className="loading-text">Loading teachers...</p>}
            {isError && <p className="error-text">Error loading teachers</p>}

            {!isLoading && !isError && teachersData.length > 0 ? (
                <div className="teacher-table-wrapper">
                    <table className="teacher-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Subject</th>
                                <th>Email</th>
                                <th>Classroom</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachersData.map((teacher) => (
                                <tr key={teacher._id}>
                                    <td>{teacher.fullName || "N/A"}</td>
                                    <td>{teacher.gender || "N/A"}</td>
                                    <td>{teacher.subject || "N/A"}</td>
                                    <td>{teacher.email || "N/A"}</td>
                                    <td>{teacher.classroomName || "N/A"}</td>
                                    <td>{teacher.phone || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !isLoading && !isError && <p className="no-teachers-text">No teachers available</p>
            )}
        </div>
    );
};
