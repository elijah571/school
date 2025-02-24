import { useParams } from "react-router-dom"; 
import { useGetStudentReportByIdQuery } from "../../redux/api/reportSlice"; 
import "./student.css";

export const Student = () => {
  const { id } = useParams();  // Get the student ID from the URL
  const { data: studentReport, isLoading: reportLoading, isError: reportError } = useGetStudentReportByIdQuery(id);

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Calculate total score for each subject list (firstCA, secondCA, exam)
  const calculateTotal = (subjects) => {
    if (!subjects || subjects.length === 0) return 0;
    return subjects.reduce((total, subject) => total + (subject.score || 0), 0); // Adjust "score" property based on your data structure
  };

  // Log the data for debugging purposes
  console.log("Student Report Data: ", studentReport);

  if (reportLoading) return <p>Loading report...</p>;
  if (reportError) return <p>Error loading report.</p>;

  return (
    <div className="student-report-container">
      {studentReport && studentReport.report ? (
        <div className="student-report">
          <h3>Student Report</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>First CA</th>
                <th>Second CA</th>
                <th>Exam</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {studentReport.report.firstCA.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subjectName}</td>
                  <td>{subject.score !== undefined ? subject.score : "N/A"}</td>
                  <td>{studentReport.report.secondCA.subjects[index]?.score !== undefined ? studentReport.report.secondCA.subjects[index].score : "N/A"}</td>
                  <td>{studentReport.report.exam.subjects[index]?.score !== undefined ? studentReport.report.exam.subjects[index].score : "N/A"}</td>
                  <td>
                    {/* Calculate the total score for this subject across the 3 sections */}
                    {subject.score + (studentReport.report.secondCA.subjects[index]?.score || 0) + (studentReport.report.exam.subjects[index]?.score || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h4>Total Grade: {studentReport.report.totalGrade}</h4>
            <h4>Teacher's Remarks: {studentReport.report.teacherRemarks}</h4>
          </div>
        </div>
      ) : (
        <p>No report available</p>
      )}
    </div>
  );
};
