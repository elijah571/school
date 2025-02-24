import { useState } from "react";
import { useCreateClassroomMutation } from "../../../redux/api/classRoomSlice"; // Corrected the import
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateClassroom = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!userInfo || !userInfo.isAdmin) {
    return <h2>Access Denied</h2>;
  }

  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [createClassroom] = useCreateClassroomMutation();
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await createClassroom({ name, gradeLevel }); // Call the mutation
      navigate("/admin/dashboard"); // Navigate on success
    } catch (error) {
      console.error("Error creating classroom:", error);
      alert("An error occurred while creating the classroom.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <h2>Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Classroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}> {/* Disabled button during loading */}
          {loading ? "Creating..." : "Create"} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default CreateClassroom;
