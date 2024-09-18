import React from "react";
import { StyledHeader } from "./style";
import { NavLink, useLocation } from "react-router-dom";
import face_recognition from "../../assets/face_recognition.png";

const Header = () => {
  const location = useLocation();

  const renderConditionalLinks = () => {
    if (location.pathname === "/") {
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
    } else if (location.pathname === "/Employee") {
      return (
        <li>
          <NavLink to="/employee" activeClassName="active" className="li-item">
            EMPLOYEE
          </NavLink>
        </li>
      );
    } else if (location.pathname === "/attendance") {
      return (
        <li>
          <NavLink
            to="/attendance"
            activeClassName="active"
            className="li-item"
          >
            ATTENDANCE
          </NavLink>
        </li>
      );
    } else if (location.pathname === "/workingRemotely") {
      return (
        <li>
          <NavLink
            to="/workingRemotely"
            activeClassName="active"
            className="li-item"
          >
            WorkingRemotely
          </NavLink>
        </li>
      );
    }
    return null;
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
          {renderConditionalLinks()}
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Header;
