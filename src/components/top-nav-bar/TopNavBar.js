import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Import icons
import "./TopNavBar.css"; // Add custom CSS for the navbar
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="top-navbar">
      <div className="navbar-right">
        <FaBell className="navbar-icon" />
        <FaUserCircle onClick={handleLogout} className="navbar-icon" />
      </div>
    </div>
  );
};

export default TopNavbar;
