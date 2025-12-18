import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
      <p className="mt-2">Role: {user.role}</p>

      <button
        onClick={logout}
        className="mt-4 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
