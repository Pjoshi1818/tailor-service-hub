import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TailorList from "./pages/TailorList";
import PlaceOrder from "./pages/PlaceOrder";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/tailors"
  element={
    <ProtectedRoute>
      <TailorList />
    </ProtectedRoute>
  }
/>
<Route 
path="/order"
element ={
  <ProtectedRoute>
    <PlaceOrder />
  </ProtectedRoute>
} />

      </Routes>
    </BrowserRouter>
  );
}
