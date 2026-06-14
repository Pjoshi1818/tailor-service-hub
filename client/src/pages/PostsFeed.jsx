// import { useState, useEffect } from "react";
// import Loader from "../components/Loader";
// import EmptyState from "../components/EmptyState";
// import { getPosts } from "../api/postsApi";

// export default function PostsFeed() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await getPosts();
//         setPosts(data);
//       } catch (err) {
//         setError("Failed to load posts");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <Loader />;

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😞</div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
//             {error}
//           </h2>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-900 dark:from-slate-50 dark:to-slate-200 bg-clip-text text-transparent mb-4">
//             Tailor Posts
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-slate-400">
//             Discover amazing work from approved tailors
//           </p>
//         </div>

//         {posts.length === 0 ? (
//           <EmptyState
//             title="No posts yet"
//             message="Approved tailors haven't shared any work yet. Check back soon!"
//             icon="📸"
//           />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {posts.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function PostCard({ post }) {
//   const tailorName = post.user?.user?.name || "Unknown Tailor";
//   const shopName = post.user?.shopName || "";
//   const displayName = shopName ? `${shopName} (${tailorName})` : tailorName;

//   return (
//     <div className="group bg-white dark:bg-slate-900/80 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//       {/* Image */}
//       <div className="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
//         <img
//           src={post.image}
//           alt={post.caption}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           onError={(e) => {
//             e.target.style.display = "none";
//             e.target.nextElementSibling.style.display = "block";
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent hidden" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent hidden" />
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <div>
//             <h3 className="font-semibold text-lg text-gray-900 dark:text-slate-50 line-clamp-1">
//               {displayName}
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-slate-400">
//               {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>

//         <p className="text-gray-700 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
//           {post.caption}
//         </p>
//       </div>
//     </div>
//   );
// }
