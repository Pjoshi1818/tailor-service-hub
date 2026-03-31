import { useEffect, useState, useMemo } from "react";
import { getAllTailors } from "../api/tailorApi";
import TailorCard from "../components/TailorCard";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function TailorList() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [experienceMin, setExperienceMin] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Build query params
  const buildQueryParams = () => {
    const params = {};
    if (selectedLocation) params.location = selectedLocation;
    if (selectedService) params.service = selectedService;
    if (selectedPriceRange) params.priceRange = selectedPriceRange;
    if (experienceMin) params.experience = experienceMin;
    return params;
  };

  // Fetch tailors
  const fetchTailors = async () => {
    try {
      setError("");
      setLoading(true);
      const params = buildQueryParams();
      const res = await getAllTailors(params);
      let fetchedTailors = res.data;

      // Client-side filtering for search and sorting
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        fetchedTailors = fetchedTailors.filter(
          (tailor) =>
            tailor.shopName.toLowerCase().includes(query) ||
            tailor.location.toLowerCase().includes(query),
        );
      }

      // Sort
      if (sortBy === "experience") {
        fetchedTailors.sort(
          (a, b) => (b.experience || 0) - (a.experience || 0),
        );
      } else if (sortBy === "a-z") {
        fetchedTailors.sort((a, b) => a.shopName.localeCompare(b.shopName));
      }

      setTailors(fetchedTailors);
    } catch (error) {
      setError("Failed to fetch tailors. Please try again later.");
      console.error("Failed to fetch tailors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTailors();
  }, [
    selectedLocation,
    selectedService,
    selectedPriceRange,
    experienceMin,
    sortBy,
  ]);

  // Extract unique values for filter dropdowns
  const uniqueLocations = useMemo(() => {
    const locations = tailors.map((t) => t.location).filter(Boolean);
    return [...new Set(locations)].sort();
  }, [tailors]);

  const uniqueServices = useMemo(() => {
    const services = tailors.flatMap((t) => t.services || []).filter(Boolean);
    return [...new Set(services)].sort();
  }, [tailors]);

  const uniquePriceRanges = useMemo(() => {
    const prices = tailors.map((t) => t.priceRange).filter(Boolean);
    return [...new Set(prices)].sort();
  }, [tailors]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedService("");
    setSelectedPriceRange("");
    setExperienceMin("");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">
            Loading tailors...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-slate-50">
          Available Tailors
        </h1>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          experienceMin={experienceMin}
          setExperienceMin={setExperienceMin}
          sortBy={sortBy}
          setSortBy={setSortBy}
          uniqueLocations={uniqueLocations}
          uniqueServices={uniqueServices}
          uniquePriceRanges={uniquePriceRanges}
          onClearFilters={handleClearFilters}
        />

        {tailors.length === 0 ? (
          <EmptyState
            icon="👔"
            title="No Tailors Available"
            description="There are no approved tailors available at the moment. Please check back later."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tailors.map((tailor) => (
              <TailorCard key={tailor._id} tailor={tailor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
