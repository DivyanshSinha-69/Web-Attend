import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StyledWorkingRemotely } from "./style";
import Header from "../Header";

const WorkingRemotely = () => {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState(""); // To display response messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/license/validatekey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }), // Send the key as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessage(result.success ? "Key validated successfully" : `Error: ${result.message}`);

      if (result.success) {
        // Redirect to /attendance if the key is validated successfully
        navigate("/attendance");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <StyledWorkingRemotely>
      <Header /> {/* If you want to use Header */}
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Key Verification</h1>
        <label className="form-label">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Key Here"
            className="form-input"
          />
        </label>
        <div className="form-message">{message}</div> {/* Display response message */}
        <button type="submit" className="form-button">
          Verify
        </button>
      </form>
    </StyledWorkingRemotely>
  );
};

export default WorkingRemotely;
