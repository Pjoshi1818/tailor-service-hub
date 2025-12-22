import { useState } from "react";
import { createTailorProfile } from "../api/tailorApi";
import { useNavigate } from "react-router-dom";

export default function TailorProfileForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    services: "",
    priceRange: "",
    location: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTailorProfile({
        shopName: form.shopName,
        services: form.services.split(",").map((s) => s.trim()),
        priceRange: form.priceRange,
        location: form.location,
        experience: Number(form.experience),
      });

      alert("Profile submitted. Waiting for admin approval.");
      navigate("/"); // back to dashboard
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create profile"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-96 text-white space-y-3"
      >
        <h2 className="text-xl font-bold text-center">
          Create Tailor Profile
        </h2>

        <input
          name="shopName"
          placeholder="Shop Name"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <input
          name="services"
          placeholder="Services (comma separated)"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <input
          name="priceRange"
          placeholder="Price Range (e.g. 500-2000)"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <input
          name="experience"
          type="number"
          placeholder="Experience (years)"
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <button className="w-full bg-green-500 p-2 rounded">
          Submit Profile
        </button>
      </form>
    </div>
  );
}
