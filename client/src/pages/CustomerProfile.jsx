import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/customerApi";
import InputField from "../components/InputField";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

// Helper to safely render a field value in view mode
const fieldValue = (value) => value?.trim() || "—";

export default function CustomerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyProfile();
      setProfile(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const startEditing = () => {
    if (!profile) return;
    setForm({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      avatar: profile.avatar || "",
    });
    setFieldErrors({});
    setSaveError("");
    setSuccess("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setFieldErrors({});
    setSaveError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSaveError("");
  };

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = "Please enter a valid email";
    }

    if (form.phone.trim() && !PHONE_REGEX.test(form.phone.trim())) {
      errors.phone = "Please enter a valid phone number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSuccess("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSaving(true);
    try {
      const res = await updateMyProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        avatar: form.avatar.trim(),
      });

      setProfile(res.data.user);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setSaveError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon="❗"
            title="Unable to load profile"
            description={error}
            action={
              <button
                onClick={fetchProfile}
                className="rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95"
              >
                Try Again
              </button>
            }
          />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon="👤"
            title="No profile data"
            description="We couldn't find any profile information for this account."
          />
        </div>
      </div>
    );
  }

  const createdAt = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header card */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-3xl font-bold text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-100 dark:ring-emerald-500/10">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                (profile.name || "?").charAt(0).toUpperCase()
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-50">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {profile.email}
              </p>
              <span className="mt-2 inline-block rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Customer
              </span>
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
                Profile Details
              </h2>
              <button
                onClick={startEditing}
                className="rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95"
              >
                Edit Profile
              </button>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Full Name
                </dt>
                <dd className="mt-1 text-gray-900 dark:text-slate-100">
                  {profile.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Email
                </dt>
                <dd className="mt-1 text-gray-900 dark:text-slate-100">
                  {profile.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Phone
                </dt>
                <dd className="mt-1 text-gray-900 dark:text-slate-100">
                  {fieldValue(profile.phone)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Address
                </dt>
                <dd className="mt-1 text-gray-900 dark:text-slate-100">
                  {fieldValue(profile.address)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Member Since
                </dt>
                <dd className="mt-1 text-gray-900 dark:text-slate-100">
                  {createdAt}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
                Edit Profile
              </h2>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Update your details below and save your changes.
              </p>
            </div>

            {saveError && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {saveError}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-4 py-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  {success}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <InputField
                id="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleChange}
                name="name"
                required
                error={fieldErrors.name}
                autoComplete="name"
              />

              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleChange}
                name="email"
                required
                error={fieldErrors.email}
                autoComplete="email"
              />

              <InputField
                id="phone"
                label="Phone"
                placeholder="e.g., +91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleChange}
                name="phone"
                error={fieldErrors.phone}
                helperText="Optional: Enter a contact number"
                autoComplete="tel"
              />

              <InputField
                id="address"
                label="Address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                onBlur={handleChange}
                name="address"
                helperText="Optional: Enter your address"
                autoComplete="street-address"
              />

              <InputField
                id="avatar"
                label="Avatar URL"
                placeholder="Paste an image URL (optional)"
                value={form.avatar}
                onChange={handleChange}
                onBlur={handleChange}
                name="avatar"
                helperText="Optional: Link to a profile picture"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelEditing}
                disabled={saving}
                className="rounded-lg border border-gray-300 dark:border-slate-700 px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-300 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-emerald-600 dark:bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving && <Loader size="sm" />}
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
