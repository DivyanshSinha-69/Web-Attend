import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBadRequest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height:40vh;
  text-align: center;
  background-color: #f8d7da;

  h1 {
    font-size: 2.5rem;
    color: #721c24;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #721c24;
    margin-bottom: 30px;
  }

  button {
    background-color: #721c24;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #501414;
  }
`;

const BadRequest = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Attendance");
  };

  return (
    <StyledBadRequest>
      <h1>Bad Request</h1>
      <p>There was an issue with your request.</p>
      <button onClick={handleRedirect}>Go Back to Attendance</button>
    </StyledBadRequest>
  );
};

export default BadRequest;
