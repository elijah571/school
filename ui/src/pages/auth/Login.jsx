import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // For redirection
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginAdminMutation } from "../../redux/api/adminSlice";
import { useLoginTeacherMutation } from "../../redux/api/teacherSlice";

export const Login = () => {
  const [userType, setUserType] = useState("admin"); // Default user type
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Error state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginAdmin, { isLoading: adminLoading }] = useLoginAdminMutation();
  const [loginTeacher, { isLoading: teacherLoading }] = useLoginTeacherMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new login attempt

    try {
      let response;
      if (userType === "admin") {
        response = await loginAdmin(userData).unwrap();
      } else {
        response = await loginTeacher(userData).unwrap();
      }

      // Destructure the user object from the response
      const { user } = response;
      
      // Save only the user credentials to Redux store and localStorage
      dispatch(setCredentials(user));
      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Logged in:`, user);

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{userType === "admin" ? "Admin" : "Teacher"} Login</h2>

      <select
        className="user-type-select"
        onChange={(e) => setUserType(e.target.value)}
        value={userType}
      >
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
      </select>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="login-input"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="login-input"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button
          className="login-button"
          type="submit"
          disabled={adminLoading || teacherLoading}
        >
          {adminLoading || teacherLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
