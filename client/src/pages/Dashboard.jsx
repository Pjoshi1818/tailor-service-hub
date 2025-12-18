import { useAuth } from "../context/AuthContext";
import CustomerDashboard from "./CustomerDashboard";
import TailorDashboard from "./TailorDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (user.role === "customer") {
    return <CustomerDashboard />;
  }

  if (user.role === "tailor") {
    return <TailorDashboard />;
  }

  return <p className="text-white">No dashboard available</p>;
}
