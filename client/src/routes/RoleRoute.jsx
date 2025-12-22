import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ children, allowed }) {
  const { user } = useAuth();

  if (!allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
