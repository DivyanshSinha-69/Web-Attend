import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage";
import Employee from "../components/Employee";
import Attendance from "../components/Attendance";
import WorkingRemotely from "../components/WorkingRemotely";
import LoginPage from "../components/Login";
import SignupPage from "../components/Signup";
import ViewAttendance from "../components/ViewAttendance";
import Error from "./Error";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute2 from "./ProtectedRoute2";
import MarkAttendance from "../components/MarkAttendance";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (

        <App />

    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/employee",

        element: (
          <ProtectedRoute2>
        <Employee />
        </ProtectedRoute2>
      ),
      },
      {
        path: "/attendance",
        element: (         <Attendance />


        ),
      },
      {
        path: "/ViewAttendance",
        element: <ViewAttendance />,
      },
      {
        path: "/markattendance",
        element:<MarkAttendance/>,
      },
      {
        path: "/workingRemotely",
        element: <WorkingRemotely />,
      },
    ],
    errorElement: <Error />,
  },
]);
export default appRouter;
