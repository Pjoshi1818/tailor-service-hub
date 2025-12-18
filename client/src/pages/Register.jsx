import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered successfully. Now login.");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-white text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 rounded" />

        <select name="role" onChange={handleChange} className="w-full p-2 rounded">
          <option value="customer">Customer</option>
          <option value="tailor">Tailor</option>
        </select>

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
