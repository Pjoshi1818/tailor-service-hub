import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import AuthButton from "../components/AuthButton";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 rounded-2xl border border-slate-800/60 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-slate-700/50"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-50">
              Create Account
            </h2>
            <p className="text-sm text-slate-400">Join TailorMarket today</p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <InputField
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => handleChange(e)}
              name="name"
              required
              autoComplete="name"
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleChange(e)}
              name="email"
              required
              autoComplete="email"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => handleChange(e)}
              name="password"
              required
              autoComplete="new-password"
            />

            <div className="space-y-1.5">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-200"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 shadow-sm outline-none transition duration-200 hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="customer">Customer</option>
                <option value="tailor">Tailor</option>
              </select>
            </div>
          </div>

          <AuthButton loading={loading} disabled={loading}>
            Register
          </AuthButton>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-emerald-400 transition-colors duration-200 hover:text-emerald-300"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

