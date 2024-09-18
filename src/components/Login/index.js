import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StyledLogin } from "./style";
import Header from "../Header";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/login", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Redirect to another page if login is successful
      navigate("/attendance"); // Change this to your desired route
    } else {
      // Handle login failure
      alert("Login failed");
    }
  };

  return (
    <StyledLogin>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Signup here</a>.
        </p>
      </div>
    </StyledLogin>
  );
};

export default LoginPage;
