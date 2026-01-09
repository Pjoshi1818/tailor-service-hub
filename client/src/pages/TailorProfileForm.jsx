import { useState } from "react";
import { createTailorProfile } from "../api/tailorApi";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Loader from "../components/Loader";

export default function TailorProfileForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    services: "",
    priceRange: "",
    location: "",
    experience: "",
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
      await createTailorProfile({
        shopName: form.shopName,
        services: form.services.split(",").map((s) => s.trim()).filter(Boolean),
        priceRange: form.priceRange,
        location: form.location,
        experience: form.experience ? Number(form.experience) : undefined,
      });

      alert("Profile submitted. Waiting for admin approval.");
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl text-gray-900 dark:text-white space-y-6 border border-gray-200 dark:border-slate-800 shadow-lg dark:shadow-2xl"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Tailor Profile</h2>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Fill in your shop details to get started
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <InputField
              id="shopName"
              label="Shop Name"
              placeholder="Enter your shop name"
              value={form.shopName}
              onChange={handleChange}
              name="shopName"
              required
            />

            <InputField
              id="services"
              label="Services"
              placeholder="e.g., Kurta, Blouse, Suit, Saree"
              value={form.services}
              onChange={handleChange}
              name="services"
              required
              helperText="Separate multiple services with commas"
            />

            <InputField
              id="priceRange"
              label="Price Range"
              placeholder="e.g., 500-2000"
              value={form.priceRange}
              onChange={handleChange}
              name="priceRange"
              helperText="Optional: Enter your typical price range"
            />

            <InputField
              id="location"
              label="Location"
              placeholder="Enter your shop location"
              value={form.location}
              onChange={handleChange}
              name="location"
              required
            />

            <InputField
              id="experience"
              label="Experience (Years)"
              type="number"
              placeholder="Enter years of experience"
              value={form.experience}
              onChange={handleChange}
              name="experience"
              helperText="Optional: Years of tailoring experience"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 dark:bg-emerald-500 text-white p-3 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader size="sm" />}
            <span>Submit Profile</span>
          </button>
        </form>
      </div>
    </div>
  );
}

