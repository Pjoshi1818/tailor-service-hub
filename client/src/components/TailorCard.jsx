import { useNavigate } from "react-router-dom";

export default function TailorCard({ tailor }) {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/order", { state: { tailor } });
  };

  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg dark:shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10">
      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
        {tailor.shopName}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-400">
        <p className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-slate-500">📍</span>
          <span>{tailor.location}</span>
        </p>
        {tailor.experience && (
          <p className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-slate-500">⏱️</span>
            <span>{tailor.experience} years experience</span>
          </p>
        )}
        {tailor.priceRange && (
          <p className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-slate-500">💰</span>
            <span>{tailor.priceRange}</span>
          </p>
        )}
      </div>

      {tailor.services && tailor.services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tailor.services.map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-xl bg-emerald-600 dark:bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-600/30 dark:hover:shadow-emerald-600/30 active:scale-95"
      >
        Place Order
      </button>
    </div>
  );
}

