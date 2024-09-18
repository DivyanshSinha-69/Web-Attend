import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bfeaf5;
  padding: 0 20px; /* Add padding to avoid content touching edges */
  box-sizing: border-box; /* Ensure padding is included in width */

  .logo {
    width: 60px;
    margin: 16px;
    box-sizing: border-box;
  }

  .nav-items {
    display: flex;
    align-items: center; /* Center nav items vertically */
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* Ensure padding is included in width */
  }

  .nav-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .nav-items-list > li {
    padding: 10px;
    margin: 0; /* Remove margin to avoid unwanted space */
    font-size: 24px;
    font-weight: 600;
  }

  .li-item {
    text-decoration: none;
    color: black;
    transition: color 0.3s; /* Smooth color transition on hover */
  }

  .li-item:hover {
    color: #007bff; /* Optional: change color on hover */
  }

  .active {
    font-weight: bold;
  }
`;
