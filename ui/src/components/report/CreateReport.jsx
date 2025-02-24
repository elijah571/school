import { useState, useEffect } from "react";
import {
  useCreateReportMutation,
} from "../../redux/api/reportSlice";
import { useGetAllClassroomsQuery } from "../../redux/api/classRoomSlice";
import { useGetAllStudentsQuery } from "../../redux/api/studentSlice";
import './createReport.css';
import { useSelector } from "react-redux";
export const CreateReport = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return console.log('not allowed');
  }
  const { data: classroomsData, isLoading: isLoadingClassrooms } = useGetAllClassroomsQuery();
  const { data: students, isLoading: isLoadingStudents } = useGetAllStudentsQuery();
  const [createReport] = useCreateReportMutation();

  const [newReport, setNewReport] = useState({
    studentId: '',
    classroomId: '',
    term: '',
    firstCA: { subjects: [] },
    secondCA: { subjects: [] },
    exam: { subjects: [] },
    teacherRemarks: '',
  });

  useEffect(() => {
  
  }, [classroomsData, students]);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.subjectIndex !== undefined) {
      const { category } = dataset;
      setNewReport((prevState) => {
        const updatedCategory = { ...prevState[category] };
        updatedCategory.subjects[dataset.subjectIndex][name] = value;
        return { ...prevState, [category]: updatedCategory };
      });
    } else {
      setNewReport((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!newReport.studentId || !newReport.classroomId || !newReport.term) {
      alert('Please select a student, classroom, and enter a term.');
      return;
    }

    try {
      // Proceed with creating the report
      await createReport(newReport);

      // Show success message
      alert('Report created successfully!');

      // Reset the form after successful submission
      setNewReport({
        studentId: '',
        classroomId: '',
        term: '',
        firstCA: { subjects: [] },
        secondCA: { subjects: [] },
        exam: { subjects: [] },
        teacherRemarks: '',
      });
    } catch (error) {
      // Show error message
      alert('Error creating report. Please try again.');
      console.error("Error creating report:", error);
    }
  };

  if (isLoadingClassrooms || isLoadingStudents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1> Create Stundents Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Student</label>
          <select
            name="studentId"
            id="studentId"
            value={newReport.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>
            {Array.isArray(students) &&
              students.length > 0 ? (
                students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.fullName} ({student._id})
                  </option>
                ))
              ) : (
                <option disabled>No students available</option>
              )}
          </select>
        </div>

        <div>
          <label htmlFor="classroomId">Classroom</label>
          <select
            name="classroomId"
            id="classroomId"
            value={newReport.classroomId}
            onChange={handleChange}
            required
          >
            <option value="">Select Classroom</option>
            {Array.isArray(classroomsData?.classrooms) &&
              classroomsData.classrooms.length > 0 ? (
                classroomsData.classrooms.map((classroom) => (
                  <option key={classroom._id} value={classroom._id}>
                    {classroom.name} ({classroom._id})
                  </option>
                ))
              ) : (
                <option disabled>No classrooms available</option>
              )}
          </select>
        </div>

        <div>
          <label htmlFor="term">Term</label>
          <input
            type="text"
            id="term"
            name="term"
            value={newReport.term}
            onChange={handleChange}
            placeholder="Enter Term"
            required
          />
        </div>

        {/* Fields for firstCA, secondCA, and exam subjects */}
        {['firstCA', 'secondCA', 'exam'].map((category) => (
          <div key={category}>
            <h3>{category === 'firstCA' ? 'First Continuous Assessment' : category === 'secondCA' ? 'Second Continuous Assessment' : 'Exam'}</h3>
            {newReport[category].subjects.length > 0 ? (
              newReport[category].subjects.map((subject, index) => (
                <div key={index}>
                  <label htmlFor={`${category}-subjectName-${index}`}>Subject Name</label>
                  <input
                    type="text"
                    id={`${category}-subjectName-${index}`}
                    name="subjectName"
                    value={subject.subjectName}
                    data-category={category}
                    data-subject-index={index}
                    onChange={handleChange}
                    placeholder="Enter Subject Name"
                    required
                  />
                  <label htmlFor={`${category}-score-${index}`}>Score</label>
                  <input
                    type="number"
                    id={`${category}-score-${index}`}
                    name="score"
                    value={subject.score}
                    data-category={category}
                    data-subject-index={index}
                    onChange={handleChange}
                    placeholder="Enter Score"
                    required
                  />
                  <label htmlFor={`${category}-grade-${index}`}>Grade</label>
                  <input
                    type="text"
                    id={`${category}-grade-${index}`}
                    name="grade"
                    value={subject.grade}
                    data-category={category}
                    data-subject-index={index}
                    onChange={handleChange}
                    placeholder="Enter Grade"
                  />
                  <label htmlFor={`${category}-teacherComments-${index}`}>Teacher's Comments</label>
                  <textarea
                    id={`${category}-teacherComments-${index}`}
                    name="teacherComments"
                    value={subject.teacherComments}
                    data-category={category}
                    data-subject-index={index}
                    onChange={handleChange}
                    placeholder="Enter Teacher's Comments"
                  />
                </div>
              ))
            ) : (
              <p>No subjects added yet.</p>
            )}
            <button
              type="button"
              onClick={() => {
                const newSubjects = [...newReport[category].subjects, { subjectName: '', score: 0, grade: '', teacherComments: '' }];
                setNewReport((prevState) => ({
                  ...prevState,
                  [category]: { ...prevState[category], subjects: newSubjects },
                }));
              }}
            >
              Add Subject
            </button>
          </div>
        ))}

        <div>
          <label htmlFor="teacherRemarks">Teacher's Remarks</label>
          <textarea
            id="teacherRemarks"
            name="teacherRemarks"
            value={newReport.teacherRemarks}
            onChange={handleChange}
            placeholder="Enter teacher's remarks"
            required
          />
        </div>

        <button type="submit">Create Report</button>
      </form>
    </div>
  );
};
