import { useState, useEffect } from "react";
import { 
  useRegisterTeacherMutation, 
  useGetTeacherDetailsQuery, 
  useUpdateTeacherMutation 
} from "../../redux/api/teacherSlice";
import ImageUpload from "../ImageUpload";
import "./teachersForm.css"; 

const TeacherForm = ({ teacherId, onSuccess }) => {
  const isEditing = Boolean(teacherId);

  // Fetch teacher data if editing
  const { data: teacherData } = useGetTeacherDetailsQuery(teacherId, { skip: !isEditing });

  // State fields for teacher details
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [isClassroomTeacher, setIsClassroomTeacher] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Store image URL instead of File object

  const [registerTeacher, { isLoading: registering }] = useRegisterTeacherMutation();
  const [updateTeacher, { isLoading: updating }] = useUpdateTeacherMutation();

  // Populate form fields when editing
  useEffect(() => {
    if (teacherData) {
      setFullName(teacherData.fullName || "");
      setGender(teacherData.gender || "");
      setEmail(teacherData.email || "");
      setPhone(teacherData.phone || "");
      setSubject(teacherData.subject || "");
      setIsClassroomTeacher(teacherData.isClassroom_Teacher || false);
      setImageUrl(teacherData.image || ""); // Set image URL when editing
    }
  }, [teacherData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("subject", subject);
    formData.append("isClassroom_Teacher", isClassroomTeacher.toString()); // Convert boolean to string

    // Append image if available (upload file if new, otherwise use image URL)
    if (imageUrl && imageUrl instanceof File) {
      formData.append("image", imageUrl);
    } else if (imageUrl) {
      formData.append("image", imageUrl); // Set as image URL if no new image is uploaded
    }

    // Only include password for new teachers
    if (!isEditing && password) {
      formData.append("password", password);
    }

    try {
      if (isEditing) {
        await updateTeacher({ id: teacherId, data: formData }).unwrap();
        alert("Teacher updated successfully!");
      } else {
        await registerTeacher(formData).unwrap();
        alert("Teacher registered successfully!");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error: " + (err?.data?.message || err.message));
    }
  };

  return (
    <form className="teacher-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Teacher" : "Register Teacher"}</h2>
      
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {!isEditing && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isClassroomTeacher}
          onChange={(e) => setIsClassroomTeacher(e.target.checked)}
        />{" "}
        Classroom Teacher
      </label>

      {/* Image Upload Component */}
      <ImageUpload onUploadSuccess={setImageUrl} existingImage={imageUrl} />

      <button type="submit" disabled={registering || updating}>
        {registering ? "Registering..." : updating ? "Updating..." : isEditing ? "Update Teacher" : "Register Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;
