import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { StyledHeader } from "./style";
import face_recognition from "../../assets/face_recognition.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove the username from localStorage
    navigate("/"); // Redirect to the home page after logging out
  };

  const renderConditionalLinks = () => {
    if (username) {
      // If the user is logged in, show "Welcome {username}" and the logout button
      return (
        <>
          <li className="li-item">Hi, {username}</li>
          <li>
            <button onClick={handleLogout} className="li-item logout-btn">
              Logout
            </button>
          </li>
        </>
      );
    } else {
      // If the user is not logged in, show the Login and Signup options
      return (
        <>
          <li>
            <NavLink to="/login" activeClassName="active" className="li-item">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              activeClassName="active"
              className="li-item"
            >
              Signup
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <StyledHeader>
      <div className="logo-container">
        <img src={face_recognition} alt="" className="logo" />
      </div>
      <div className="nav-items">
        <ul className="nav-items-list">
          <li>
            <NavLink to="/" activeClassName="active" className="li-item">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active" className="li-item">
              About
            </NavLink>
          </li>
          {renderConditionalLinks()} {/* Display Welcome or Login/Signup */}
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Header;
