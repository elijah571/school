import { useSelector } from "react-redux";
import AdminDashboard from "../admin/AdminDashboard";
import { StudentDashboard } from "../../components/student-dashboard/StudentDashboard";
import { Teacher } from "../../components/teacher/Teacher";
import { TimeTable } from "../../components/time-table/TimeTable";

export const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {/* Only show AdminDashboard if the user is an admin */}
      {userInfo && userInfo.isAdmin && <AdminDashboard />}
      
      {/* Other dashboard components */}
      <StudentDashboard />
      <TimeTable />
      <Teacher />
    </div>
  );
};

export default Dashboard;
