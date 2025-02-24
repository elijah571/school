import React, { useState, useEffect } from "react";
import { useUploadImageMutation } from "../redux/api/uploadSlice";

const ImageUpload = ({ onUploadSuccess, existingImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingImage || ""); // Use existing image if available
  const [uploadImage, { isLoading, error }] = useUploadImageMutation();

  useEffect(() => {
    setPreview(existingImage);
  }, [existingImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Preview new image before upload
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image to upload.");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData).unwrap();
      alert("Image uploaded successfully!");
      onUploadSuccess(response.url); // Set new uploaded image URL
    } catch (err) {
      alert("Error uploading image: " + err?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>
      {preview && <img src={preview} alt="Preview" width="100" />}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export default ImageUpload;
