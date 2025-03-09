import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to the login page if no token is found
      navigate("/");
    }
  }, [navigate]);

  return children; // Render the children components (protected routes)
};

export default PrivateRoute;
