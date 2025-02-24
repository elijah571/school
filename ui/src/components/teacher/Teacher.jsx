import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import './teacher.css';

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
            <h2 className="teacher-title">Teachers List</h2>

            {isLoading ? (
                <p className="loading-text">Loading teachers...</p>
            ) : isError ? (
                <p className="error-text">Error loading teachers</p>
            ) : teachersData.length > 0 ? (
                <div className="teacher-table-wrapper">
                    <table className="teacher-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Email</th>
                                <th>Classroom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachersData.map((teacher) => (
                                <tr key={teacher._id}>
                                    <td>{teacher.fullName}</td>
                                    <td>{teacher.subject || 'N/A'}</td>
                                    <td>{teacher.email || 'N/A'}</td>
                                    <td>{teacher.classroomName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-teachers-text">No teachers available</p>
            )}
        </div>
    );
};
