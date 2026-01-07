import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import TailorList from "../pages/TailorList";
import PlaceOrder from "../pages/PlaceOrder";
import TailorProfileForm from "../pages/TailorProfileForm";
import TailorOrders from "../pages/TailorOrders";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard (Role-based routing handled inside Dashboard component) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/tailors"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["customer"]}>
              <TailorList />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["customer"]}>
              <PlaceOrder />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Tailor Routes */}
      <Route
        path="/tailor/profile"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["tailor"]}>
              <TailorProfileForm />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tailor/orders"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["tailor"]}>
              <TailorOrders />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

