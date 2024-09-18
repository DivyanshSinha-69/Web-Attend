import React, { useState } from "react";
import { StyledAttendance } from "./style";
import Card from "../Card";
import WebCam from "../WebCam";

import { useNavigate } from "react-router";

const Attendance = () => {
  const navigate = useNavigate();
  const [showWebCam, setShowWebCam] = useState(false);

  const handleMarkAttendance = () => {
    setShowWebCam(true);
  };

  const handleCapture = () => {
    // logic to Send the captured image data to the backend
    setShowWebCam(false); // Hide the webcam component after capturing
  };

  const handleViewAttendance = () => {
    navigate("/Attendance");
  };
  return (
    <StyledAttendance>
      {showWebCam ? (
        <WebCam onCapture={handleCapture} />
      ) : (
        <div className="card-container">
          <Card name="Mark my attendance" onClick={handleMarkAttendance} />
          <Card name="View my attendance" onClick={handleViewAttendance} />
        </div>
      )}
    </StyledAttendance>
  );
};

export default Attendance;
