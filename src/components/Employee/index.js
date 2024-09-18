import React from "react";
import { StyledEmployee } from "./style";
import Card from "../Card";

import { useNavigate } from "react-router";

const Employee = () => {
  const navigate = useNavigate();

  const handleOfficeWork = () => {
    navigate("/attendance");
  };

  const handleRemoteWork = () => {
    navigate("/workingRemotely");
  };
  return (
    <StyledEmployee>
      <div className="card-container">
        <Card name="Working from Office" onClick={handleOfficeWork} />
        <Card name="Working Remotely" onClick={handleRemoteWork} />
      </div>
    </StyledEmployee>
  );
};

export default Employee;
