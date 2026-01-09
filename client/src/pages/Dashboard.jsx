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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-gray-900 dark:text-white">No dashboard available for this role.</p>
      </div>
    </div>
  );
}

