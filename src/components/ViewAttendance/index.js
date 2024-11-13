// import React, { useState } from "react";
// import axios from "axios";

// const ViewAttendance = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [previousDatesTimes, setPreviousDatesTimes] = useState([]);
//   const [error, setError] = useState("");

//   const handleViewAttendance = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError("Please provide both username and password");
//       return;
//     }

//     try {
//       const data = { username: username, password: password };

//       const response = await axios.post("http://localhost:5000/api/view-attendance", data);

//       // Debug the response to check the structure
//       console.log("Backend response:", response.data);

//       if (response.status === 200) {
//         const { attendance, previous_dates_times } = response.data;

//         // Check if attendance data and previous dates/times are available
//         if (attendance) {
//           setAttendanceRecords(attendance);
//         } else {
//           console.log("Attendance data is missing");
//           setError("Attendance data missing");
//         }

//         if (previous_dates_times) {
//           setPreviousDatesTimes(previous_dates_times);
//         } else {
//           console.log("Previous dates and times are missing");
//           setPreviousDatesTimes([]);
//         }
//       } else {
//         setError("No attendance records found.");
//       }
//     } catch (err) {
//       console.error("Error fetching attendance:", err);
//       setError(err.response?.data?.error || "An error occurred while fetching attendance.");
//     }
//   };

//   return (
//     <div>
//       <h2>View Attendance</h2>

//       <form onSubmit={handleViewAttendance}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter Username"
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//           />
//         </div>

//         <button type="submit">View Attendance</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div>
//         <h3>Attendance Records</h3>
//         {attendanceRecords.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Roll Number</th>
//                 <th>Date</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceRecords.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.name || "Name not available"}</td>
//                   <td>{record.rollNo || "Roll number not available"}</td>
//                   <td>{record.date || "Date not available"}</td>
//                   <td>{record.time || "Time not available"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No attendance records found.</p>
//         )}
//       </div>


//     </div>
//   );
// };

// export default ViewAttendance;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // For accessing the state

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");

  // Access the username and password from the state passed by the login page
  const location = useLocation();
  const { username, password } = location.state || {};

  useEffect(() => {
    if (username && password) {
      handleViewAttendance();
    }
  }, [username, password]);

  const handleViewAttendance = async () => {
    try {
      const data = { username, password };

      const response = await axios.post("http://localhost:5000/api/view-attendance", data);

      if (response.status === 200) {
        setAttendanceRecords(response.data.attendance);
      } else {
        setError("No attendance records found.");
      }
    } catch (err) {
      setError("Error fetching attendance");
    }
  };

  return (
    <div>
      <h2>View Attendance</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>Attendance Records</h3>
        {attendanceRecords.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.name || "Name not available"}</td>
                  <td>{record.rollNo || "Roll number not available"}</td>
                  <td>{record.date || "Date not available"}</td>
                  <td>{record.time || "Time not available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
