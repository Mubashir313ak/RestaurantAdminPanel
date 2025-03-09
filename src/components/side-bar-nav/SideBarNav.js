import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaCog, FaBars } from "react-icons/fa"; // Importing icons
import "./SideBarNav.css"; // Custom CSS

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar state

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when a menu item is selected
  const handleItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars className="hamburger-icon" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard" onClick={handleItemClick}>
              <FaTachometerAlt className="sidebar-icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleItemClick}>
              <FaUser className="sidebar-icon" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/order" onClick={handleItemClick}>
              <FaCog className="sidebar-icon" /> Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
