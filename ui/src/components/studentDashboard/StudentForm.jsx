import { useState, useEffect } from "react";
import { 
  useCreateStudentMutation, 
  useGetStudentByIdQuery, 
  useUpdateStudentMutation 
} from "../../redux/api/studentSlice";
import ImageUpload from "../ImageUpload";
import "./studentForm.css"; // Import the CSS file for styling

const StudentForm = ({ studentId, onSuccess }) => {
  const isEditing = Boolean(studentId);


  const { data: studentData } = useGetStudentByIdQuery(studentId, { skip: !isEditing });

  // State fields
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [parent, setParent] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [createStudent, { isLoading: creating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();

  // Populate form fields when editing
  useEffect(() => {
    if (studentData) {
      setFullName(studentData.fullName);
      setGender(studentData.gender);
      setParent(studentData.parent);
      setEmail(studentData.email);
      setPhone(studentData.phone);
      setDOB(studentData.DOB);
      setAddress(studentData.address);
      setImageUrl(studentData.image);
    }
  }, [studentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData to send as multipart/form-data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("parent", parent);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("DOB", DOB);
    formData.append("address", address);
    formData.append("image", imageUrl); // imageUrl should be a non-empty string (the URL) if image was uploaded

    try {
      if (isEditing) {
        // For updating, we pass the student ID along with the formData.
        await updateStudent({ _id: studentId, data: formData }).unwrap();
        alert("Student updated successfully!");
      } else {
        await createStudent(formData).unwrap();
        alert("Student added successfully!");
      }
      onSuccess();
    } catch (err) {
      alert("Error: " + (err?.data?.message || err.message));
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Student" : "Add Student"}</h2>
      
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
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Parent"
        value={parent}
        onChange={(e) => setParent(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        type="date"
        placeholder="DOB"
        value={DOB}
        onChange={(e) => setDOB(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      {/* Image Upload Component */}
      <ImageUpload onUploadSuccess={setImageUrl} existingImage={imageUrl} />

      <button type="submit" disabled={creating || updating}>
        {creating ? "Adding..." : updating ? "Updating..." : isEditing ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
