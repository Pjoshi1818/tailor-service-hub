import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import AuthButton from "../components/AuthButton";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      // 🔎 DEBUG (remove later if you want)
      console.log("LOGIN RESPONSE 👉", res.data);

      // 🛡️ SAFETY CHECK (prevents refresh logout bug)
      if (!res.data?.token || !res.data?.user) {
        console.error("Invalid login response shape", res.data);
        setError("Login failed due to server response. Contact admin.");
        return;
      }

      // ✅ correct login
      login(res.data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 py-8">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-10 rounded-2xl
                     w-full space-y-6 shadow-lg dark:shadow-2xl
                     border border-gray-200 dark:border-slate-800
                     transition-all duration-300 hover:border-gray-300 dark:hover:border-slate-700"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <InputField
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <AuthButton loading={loading} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </AuthButton>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300
                         focus:outline-none focus:underline transition"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
