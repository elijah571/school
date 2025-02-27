import { useGetAllReportsQuery } from "../../redux/api/reportSlice";
import './AllReports.css'; // Import the CSS file

export const AllReports = () => {
  const { data, isLoading, error } = useGetAllReportsQuery();

  // Log the entire data for debugging
  console.log('Reports Data:', data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading reports: {error.message}</p>;
  }

  // Access the 'reports' array inside the data object
  const reports = data?.reports;

  return (
    <div className="reports-container">
      <h2>All Reports</h2>
      {reports?.length > 0 ? (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>First CA</th>
              <th>Second CA</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Teacher Remarks</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              // Calculate total score
              const totalScore = [
                ...report.firstCA.subjects,
                ...report.secondCA.subjects,
                ...report.exam.subjects
              ].reduce((sum, subject) => sum + subject.score, 0);

              // Calculate grade based on total score
              let grade = '';
              if (totalScore >= 180) {
                grade = 'A';
              } else if (totalScore >= 150) {
                grade = 'B';
              } else if (totalScore >= 120) {
                grade = 'C';
              } else {
                grade = 'D';
              }

              return (
                <tr key={report._id}>
                  <td>{report.student.fullName}</td>
                  <td>
                    {report.firstCA.subjects.map((subject, index) => (
                      <div key={index}>
                        <span>{subject.subjectName} - {subject.score} </span>
                      </div>
                    ))}
                  </td>
                  <td>
                    {report.secondCA.subjects.map((subject, index) => (
                      <div key={index}>
                        <span>{subject.subjectName} - {subject.score} </span>
                      </div>
                    ))}
                  </td>
                  <td>
                    {report.exam.subjects.map((subject, index) => (
                      <div key={index}>
                        <span>{subject.subjectName} - {subject.score}</span>
                      </div>
                    ))}
                  </td>
                  <td>{totalScore}</td>
                  <td>{grade}</td>
                  <td>{report.teacherRemarks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No reports available</p>
      )}
      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
};
