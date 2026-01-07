import CustomerDashboard from "./CustomerDashboard";
import TailorDashboard from "./TailorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.role === "customer") {
    return <CustomerDashboard />;
  }

  if (user.role === "tailor") {
    return <TailorDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-white">No dashboard available for this role.</p>
      </div>
    </div>
  );
}

