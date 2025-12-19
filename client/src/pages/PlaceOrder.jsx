import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  // Tailor data passed from previous page
  const { tailor } = location.state || {};

  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        tailorId: tailor._id,
        serviceType,
        description,
        price,
      });
      alert("Order placed successfully");
      navigate("/");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  if (!tailor) {
    return <p className="text-white p-6">No tailor selected</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-96 space-y-3 text-white"
      >
        <h2 className="text-xl font-bold">
          Place Order - {tailor.shopName}
        </h2>

        <input
          placeholder="Service Type (Kurta, Blouse...)"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        <button className="w-full bg-green-500 p-2 rounded">
          Submit Order
        </button>
      </form>
    </div>
  );
}
