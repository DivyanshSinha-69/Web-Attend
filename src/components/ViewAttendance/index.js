import React, { useEffect, useState } from "react";
import { StyledAttendanceTable } from "./style"; // Ensure this path is correct
import axios from "axios";

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/attendance"); // Replace with your actual API endpoint
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <StyledAttendanceTable>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.subject}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledAttendanceTable>
  );
};

export default ViewAttendance;
