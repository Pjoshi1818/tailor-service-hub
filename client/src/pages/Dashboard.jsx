import CustomerDashboard from "./CustomerDashboard";
import TailorDashboard from "./TailorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../context/AuthContext";


export default function Dashboard() {
  const { user } = useAuth();

  if (user.role === "customer") {
    return <CustomerDashboard />;
  }

  if (user.role === "tailor") {
    return <TailorDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <p className="text-white">No dashboard available</p>;
}
