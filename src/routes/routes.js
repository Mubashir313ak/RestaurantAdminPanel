// src/routes.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import MainLayout from "../components/layout.js/MainLayout";
import PrivateRoute from "../components/auth/PrivateRoute";
import AdminDashboard from "../screens/dashboard/Dashboard";
import OrderCard from "../screens/order/OrderCard";
import OrderDetail from "../screens/order/OrderDetail";

const RoutesConfig = () => (
  <Routes>
    {/* Define routes for login and register */}
    <Route path="/register" element={<RegisterScreen />} />
    <Route path="/" element={<LoginScreen />} />

    {/* Use Layout component for the protected routes */}
    <Route path="/" element={<MainLayout />}>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/profile" element={<h2>Profile Screen</h2>} />
      <Route path="/settings" element={<h2>Settings Screen</h2>} />
    </Route>

    {/* Order route */}
    <Route path="/" element={<MainLayout />}>
      <Route path="/order" element={<OrderCard />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Route>
  </Routes>
);

export default RoutesConfig;
