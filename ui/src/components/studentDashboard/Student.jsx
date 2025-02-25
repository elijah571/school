import { useParams } from "react-router-dom"; 
import { useGetStudentReportByIdQuery } from "../../redux/api/reportSlice"; 
import { FaBook } from 'react-icons/fa';

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
    return subjects.reduce((total, subject) => total + (subject.score || 0), 0);
  };

  // Calculate total number of subjects
  const totalSubjects = studentReport?.report?.firstCA?.subjects?.length || 0;

  // Calculate total passed subjects (e.g., total score above 50)
  const totalPassed = studentReport?.report?.firstCA?.subjects?.filter((subject, index) => {
    const firstCA = subject.score || 0;
    const secondCA = studentReport.report.secondCA.subjects[index]?.score || 0;
    const exam = studentReport.report.exam.subjects[index]?.score || 0;
    return (firstCA + secondCA + exam) >= 50;
  }).length || 0;

  // Calculate average score across all subjects
  const totalScores = studentReport?.report?.firstCA?.subjects?.map((subject, index) => {
    const firstCA = subject.score || 0;
    const secondCA = studentReport.report.secondCA.subjects[index]?.score || 0;
    const exam = studentReport.report.exam.subjects[index]?.score || 0;
    return firstCA + secondCA + exam;
  }) || [];
  const averageScore = totalScores.length > 0 ? (totalScores.reduce((acc, score) => acc + score, 0) / totalScores.length).toFixed(2) : 0;

  if (reportLoading) return <p>Loading report...</p>;
  if (reportError) return <p>Error loading report.</p>;

  return (
    <div className="student-report-container">
   <div className="report-summary">
  <h6>Report Summary</h6>
  <div className="report-cards">
    {/* Grade Scale */}
    <div className="report-card grade-scale-card">
      <h5>Grade Scale</h5>
      <div className="grade-details">
        <div>
          <h6>Excellent (A)</h6>
          <small>80-100</small>
        </div>
        <div>
          <h6>Very Good (B)</h6>
          <small>70-79</small>
        </div>
        <div>
          <h6>Good (C)</h6>
          <small>60-69</small>
        </div>
        <div>
          <h6>Pass (D)</h6>
          <small>50-59</small>
        </div>
        <div>
          <h6>Fail (F)</h6>
          <small>0-49</small>
        </div>
      </div>
    </div>
    {/* Total Subjects */}
    <div className="report-card total-subjects-card">
      <div>
        <h5>Total Subjects</h5>
        <small className="report-value">{totalSubjects}</small>
      </div>
      <div className="icon-container">
        <FaBook className="icon-style" />
      </div>
    </div>
    {/* Total Passed */}
    <div className="report-card total-passed-card">
      <div>
        <h5>Total Passed</h5>
        <small className="report-value">{totalPassed} Subjects</small>
      </div>
      <div className="icon-container">
        <FaBook className="icon-style" />
      </div>
    </div>
    {/* Failed */}
    <div className="report-card failed-card">
      <div>
        <h5>Failed</h5>
        <small className="report-value">{totalSubjects - totalPassed} Subjects</small>
      </div>
      <div className="icon-container">
        <FaBook className="icon-style" />
      </div>
    </div>
  </div>
</div>


      {studentReport && studentReport.report ? (
        <div className="student-report">
          <h3>Student Report</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>First CA (20 marks)</th>
                <th>Second CA (20 marks)</th>
                <th>Exam (60 marks)</th>
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
                    {subject.score + 
                      (studentReport.report.secondCA.subjects[index]?.score || 0) + 
                      (studentReport.report.exam.subjects[index]?.score || 0)}
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
