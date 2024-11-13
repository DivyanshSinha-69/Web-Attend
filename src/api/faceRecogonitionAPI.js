import axios from "axios";

const API_URL = "http://localhost:5000/api";

// api/faceRecognitionAPI.js

// Register face
export const registerFace = async (imageFile, name, rollNo, role, username, password) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("name", name);
  formData.append("rollNo", rollNo);
  formData.append("role", role);
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in registration:", error);
    return { error: "Registration failed" };
  }
};

// Recognize face for attendance
export const recognizeFace = async (imageFile, username, password) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("username", username);
  formData.append("password", password); // Pass username and password for authentication

  try {
    const response = await fetch("http://localhost:5000/api/recognize", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in recognition:", error);
    return { error: "Recognition failed" };
  }
};
// Mark attendance
export const markAttendance = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("http://localhost:5000/api/mark-attendance", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in marking attendance:", error);
    return { error: "Attendance marking failed" };
  }
};

export const getAttendanceReport = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/attendance-report?name=${name}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    return { error: "Failed to retrieve attendance report" };
  }
};
