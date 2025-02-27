import './TimeTable.css';
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";

export const TimeTable = () => {
    const { data: classrooms, isLoading, isError } = useGetAllClassroomsQuery();

    // Ensure classroomsData is always an array
    const classroomsData = Array.isArray(classrooms?.classrooms) ? classrooms.classrooms : [];

    return (
        <div className="timetable-container">
            <h2>Time Table</h2>

            {isLoading ? (
                <p>Loading timetable...</p>
            ) : isError ? (
                <p>Error loading timetable</p>
            ) : classroomsData.length > 0 ? (
                classroomsData.map((classroom) => {
                    // Ensure schedule is always an array
                    const schedule = Array.isArray(classroom.schedule) ? classroom.schedule : [];

                    // Get all unique days dynamically
                    const allDays = schedule.reduce((daysSet, item) => {
                        Object.keys(item.days).forEach(day => daysSet.add(day));
                        return daysSet;
                    }, new Set());

                    return (
                        <div key={classroom._id} className="classroom-schedule">
                            <h3>{classroom.name} - Timetable</h3>
                            {schedule.length > 0 ? (
                                <table className="schedule-table">
                                    <thead>
                                        <tr>
                                            <th>Time Slot</th>
                                            {Array.from(allDays).map(day => (
                                                <th key={day}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((scheduleItem) => (
                                            <tr key={scheduleItem._id}>
                                                <td>{scheduleItem.timeSlot}</td>
                                                {Array.from(allDays).map(day => (
                                                    <td key={day}>
                                                        {scheduleItem.days[day] || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No schedule available</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>No classrooms available</p>
            )}
        </div>
    );
};
