// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import InputField from "../components/InputField";
// import { createPost } from "../api/postsApi";
// import { useAuth } from "../context/AuthContext";

// export default function TailorPostForm() {
//   const [formData, setFormData] = useState({
//     image: "",
//     caption: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Tailor auth check
//   if (user?.role !== "tailor") {
//     navigate("/login");
//     return null;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Image preview
//     if (name === "image" && value) {
//       setPreview(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.image.trim() || !formData.caption.trim()) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (formData.caption.length > 500) {
//       setError("Caption too long (max 500 chars)");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await createPost(formData);
//       setSuccess(true);

//       // Reset and redirect after 1.5s
//       setTimeout(() => {
//         navigate("/tailor/dashboard");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-12 text-center transform scale-105">
//           <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 rounded-3xl mx-auto mb-8 flex items-center justify-center">
//             <span className="text-4xl">✨</span>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
//             Post Created!
//           </h2>
//           <p className="text-lg text-emerald-700 dark:text-emerald-400 mb-8">
//             Your work has been shared with customers
//           </p>
//           <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 animate-pulse">
//             <p className="font-medium text-emerald-800 dark:text-emerald-300">
//               Redirecting to dashboard...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4">
//             Share Your Work
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
//             Showcase your latest designs to attract more customers
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 p-8 md:p-12">
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
//               <p className="text-red-800 dark:text-red-200 font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Image URL */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 dark:text-slate-200 mb-3">
//                 Image URL *
//               </label>
//               <InputField
//                 name="image"
//                 value={formData.image}
//                 onChange={handleChange}
//                 placeholder="https://example.com/your-design.jpg"
//                 type="url"
//                 required
//               />
//             </div>

//             {/* Preview */}
//             {preview && (
//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-900 dark:text-slate-200 mb-2">
//                   Preview
//                 </label>
//                 <div className="relative group">
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-emerald-200/50 dark:border-emerald-800/50"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       e.target.nextElementSibling.style.display = "flex";
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-4">
//                     <span className="text-white font-semibold text-sm bg-black/30 px-3 py-1 rounded-full">
//                       Looks good! ✨
//                     </span>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-red-500/90 to-red-600/90 text-white font-bold text-xl rounded-2xl hidden">
//                     Invalid image URL
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Caption */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 dark:text-slate-200 mb-3">
//                 Caption * (max 500 chars)
//               </label>
//               <textarea
//                 name="caption"
//                 value={formData.caption}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Tell customers about this design... e.g., 'Custom silk saree blouse with intricate embroidery. Perfect for weddings!'"
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800/50 dark:text-slate-200 transition-all resize-vertical"
//                 maxLength={500}
//                 required
//               />
//               <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
//                 {formData.caption.length}/500
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/tailor/dashboard")}
//                 className="flex-1 px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all font-medium"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 disabled={loading}
//               >
//                 {loading ? <Loader size="sm" /> : "📸 Share Post"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
