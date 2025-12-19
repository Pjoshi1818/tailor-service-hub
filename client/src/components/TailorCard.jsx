import { useNavigate } from "react-router-dom";

export default function TailorCard({ tailor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white">
      <h3 className="text-xl font-bold">{tailor.shopName}</h3>

      <p className="text-sm mt-1">Location: {tailor.location}</p>
      <p className="text-sm">Experience: {tailor.experience} years</p>
      <p className="text-sm mt-2">
        Services: {tailor.services.join(", ")}
      </p>

      <button
        onClick={() =>
          navigate("/order", { state: { tailor } })
        }
        className="mt-4 bg-green-500 px-3 py-1 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
