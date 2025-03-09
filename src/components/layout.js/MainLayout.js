import React from "react";

import { Outlet } from "react-router-dom"; // To render child routes
import TopNavbar from "../top-nav-bar/TopNavBar";
import Sidebar from "../side-bar-nav/SideBarNav";

const MainLayout = () => {
  return (
    <div className="app-container">
      <TopNavbar /> {/* Top Navbar */}
      <Sidebar /> {/* Sidebar on left */}
      <div className="content">
        <Outlet /> {/* Child content will be rendered here */}
      </div>
    </div>
  );
};

export default MainLayout;
