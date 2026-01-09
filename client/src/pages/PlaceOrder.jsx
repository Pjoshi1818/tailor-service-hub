import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import InputField from "../components/InputField";
import Loader from "../components/Loader";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const { tailor } = location.state || {};

  const [form, setForm] = useState({
    serviceType: "",
    description: "",
    price: "",
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
      await createOrder({
        tailorId: tailor._id,
        serviceType: form.serviceType,
        description: form.description,
        price: form.price,
      });
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!tailor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600 dark:text-slate-400">No tailor selected</p>
          <button
            onClick={() => navigate("/tailors")}
            className="mt-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Browse Tailors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 py-8">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50">Place Order</h2>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">{tailor.shopName}</p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <InputField
              id="serviceType"
              label="Service Type"
              placeholder="e.g., Kurta, Blouse, Suit..."
              value={form.serviceType}
              onChange={handleChange}
              name="serviceType"
              required
            />

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-slate-200"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Provide details about your order..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
                className="block w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-500 shadow-sm outline-none transition duration-200 hover:border-gray-400 dark:hover:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <InputField
              id="price"
              label="Price"
              type="number"
              placeholder="Enter amount"
              value={form.price}
              onChange={handleChange}
              name="price"
              required
              helperText="Enter the expected price for this order"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-600/30 dark:hover:shadow-emerald-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader size="sm" />}
            <span>Submit Order</span>
          </button>
        </form>
      </div>
    </div>
  );
}

