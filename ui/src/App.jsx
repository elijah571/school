import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Report } from "./pages/reports/Report";
import { Login } from "./pages/auth/Login";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateClassroom from "./components/dashboard/classroom/CreateClassroom";
import AssignTeacher from "./components/dashboard/assignTeacher/AssignTeacher";
import AssignStudents from "./components/dashboard/student/assignStudent";
import { GetAllAttendance } from "./components/attendace/GetAllAttendance";
import { Alunmi } from "./pages/alunmi/Alunmi";
import { News } from "./pages/news/News";
import { AlumniBodies } from "./pages/alunmi/AlumniBodies";
import { StudentDetails } from "./pages/student/StudentDetails";
import { GetStudentAttendance } from "./components/attendace/GetStudentAttendace";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/alumni" element={<Alunmi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<GetAllAttendance />} />
        <Route path="/news" element={<News />} />
        <Route path="/alumni-bodies" element={<AlumniBodies />} />

        {/* Student Routes with Nested Navigation */}
        <Route path="/student/:id" element={<StudentDetails />}>
          <Route index element={<Report />} /> {/* Default to student report */}
          <Route path="attendance" element={<GetStudentAttendance />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-classroom" element={<CreateClassroom />} />
          <Route path="/admin/assign-teacher" element={<AssignTeacher />} />
          <Route path="/admin/assign-students" element={<AssignStudents />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
