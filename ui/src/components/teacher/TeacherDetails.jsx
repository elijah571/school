import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTeacherDetailsQuery } from '../../redux/api/teacherSlice';
import './teacherDetails.css';

export const TeacherDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetTeacherDetailsQuery(id);

    // Extract the teacher object
    const teacher = data?.teacher;

    // Log the API response
    useEffect(() => {
        console.log('API Response:', teacher);
    }, [teacher]);

    return (
        <div className="teacher-details-container">
            <h2 className="teacher-title">Teacher Details</h2>

            {isLoading ? (
                <p className="loading-text">Loading teacher details...</p>
            ) : isError ? (
                <p className="error-text">Error loading teacher details</p>
            ) : teacher ? (
                <div className="teacher-details-table-wrapper">
                    <table className="teacher-details-table">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{teacher.fullName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{teacher.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{teacher.phone}</td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td>{teacher.subject}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{teacher.gender}</td>
                            </tr>
                            
                           
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-teacher-text">Teacher not found</p>
            )}
        </div>
    );
};
