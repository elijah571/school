import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTeacherDetailsQuery } from '../../redux/api/teacherSlice';
import { useGetAllClassroomsQuery } from '../../redux/api/classRoomSlice';
import './teacherDetails.css';

export const TeacherDetails = () => {
    const { id } = useParams();
    const { data: teacherData, isLoading: isLoadingTeacher, isError: isErrorTeacher } = useGetTeacherDetailsQuery(id);
    const teacher = teacherData?.teacher;

    const { data: classroomData, isLoading: isLoadingClassrooms, isError: isErrorClassrooms } = useGetAllClassroomsQuery();

    // Enhanced logging to understand the structure
    useEffect(() => {
        console.log('Classroom Data Type:', typeof classroomData);
        console.log('Classroom Data:', classroomData);

        if (Array.isArray(classroomData?.classrooms)) {
            classroomData.classrooms.forEach(classroom => {
                console.log(`Classroom: ${classroom.name}`);
                console.log('Schedule:', classroom.schedule);
            });
        } else {
            console.log('Classroom Data is not an array or classrooms key is missing');
        }
    }, [classroomData]);

    // Extract all schedules from all classrooms
    const allSchedules = Array.isArray(classroomData?.classrooms) 
        ? classroomData.classrooms.flatMap(classroom => classroom?.schedule || [])
        : [];

    console.log('All Schedules:', allSchedules);

    // Define days for the timetable
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Render the schedule
    const renderSchedule = () => {
        if (allSchedules.length === 0) {
            return <p className="error-text">No schedule available</p>;
        }

        return (
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        {days.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allSchedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{schedule.timeSlot}</td>
                            {days.map(day => {
                                const subject = schedule.days?.[day] || '-';
                                const isTeacherSubject = subject === teacher?.subject;
                                return (
                                    <td key={day} className={isTeacherSubject ? 'highlight' : ''}>
                                        {isTeacherSubject ? subject : '-'}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="teacher-details-container">
          

            {isLoadingTeacher ? (
                <p className="loading-text">Loading teacher details...</p>
            ) : isErrorTeacher ? (
                <p className="error-text">Error loading teacher details</p>
            ) : teacher ? (
                <div className="teacher-details-card">
    <h2 className="teacher-title">Teacher Details</h2>
    {isLoadingTeacher ? (
        <p className="loading-text">Loading teacher details...</p>
    ) : isErrorTeacher ? (
        <p className="error-text">Error loading teacher details</p>
    ) : teacher ? (
        <div className="teacher-info">
            <div className="info-item">
                <h3 className="info-title">Full Name</h3>
                <p className="info-detail">{teacher.fullName}</p>
            </div>
            <div className="info-item">
                <h3 className="info-title">Email</h3>
                <p className="info-detail">{teacher.email}</p>
            </div>
            <div className="info-item">
                <h3 className="info-title">Phone</h3>
                <p className="info-detail">{teacher.phone}</p>
            </div>
            <div className="info-item">
                <h3 className="info-title">Subject</h3>
                <p className="info-detail">{teacher.subject}</p>
            </div>
        </div>
    ) : (
        <p className="error-text">Teacher not found</p>
    )}
</div>

            ) : (
                <p className="error-text">Teacher not found</p>
            )}

            <h2 className="teacher-title">Upcoming Lectures</h2>
            {isLoadingClassrooms ? (
                <p className="loading-text">Loading classroom schedules...</p>
            ) : isErrorClassrooms ? (
                <p className="error-text">Error loading classroom schedules</p>
            ) : (
                renderSchedule()
            )}
        </div>
    );
};
