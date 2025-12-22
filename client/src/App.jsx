import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TailorList from "./pages/TailorList";
import PlaceOrder from "./pages/PlaceOrder";
import TailorOrders from "./pages/TailorOrders";
import Navebar from "./pages/Navebar";
import TailorProfileForm from "./pages/TailorProfileForm";


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
<Route
  path="/tailor/orders"
  element={
    <ProtectedRoute>
      <TailorOrders />
    </ProtectedRoute>
  }
/>
<Route 
  path="/navebar" 
  element={
    <ProtectedRoute>
      <Navebar />
    </ProtectedRoute>
  }
 />

 <Route
    path="/tailor/profile"
    element={
      <ProtectedRoute >
        <TailorProfileForm />
      </ProtectedRoute>
    }
 />
      </Routes>
    </BrowserRouter>
  );
}
