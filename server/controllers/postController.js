// const Post = require("../models/Post");
// const Tailor = require("../models/Tailor");
// const User = require("../models/User");
// const asyncHandler = require("express-async-handler");

// // @desc    Create new post (tailor only)
// // @route   POST /api/posts
// // @access  Private/Tailor
// const createPost = asyncHandler(async (req, res) => {
//   const { image, caption } = req.body;
//   const tailorId = req.user._id; // req.user is from protect middleware (User), but need Tailor ID

//   // Find tailor's profile
//   const tailor = await Tailor.findOne({ user: tailorId });
//   if (!tailor) {
//     res.status(404);
//     throw new Error("Tailor profile not found");
//   }

//   const post = await Post.create({
//     user: tailor._id,
//     image,
//     caption,
//   });

//   // Populate for response
//   const populatedPost = await Post.findById(post._id).populate({
//     path: "user",
//     populate: { path: "user", select: "name" },
//     select: "shopName status",
//   });

//   res.status(201).json(populatedPost);
// });

// // @desc    Get all posts (approved tailors only)
// // @route   GET /api/posts
// // @access  Public
// const getPosts = asyncHandler(async (req, res) => {
//   const posts = await Post.find({ "user.status": "approved" })
//     .populate({
//       path: "user",
//       match: { status: "approved" }, // Double filter
//       populate: { path: "user", select: "name" },
//       select: "shopName",
//     })
//     .sort({ createdAt: -1 })
//     .limit(20);

//   // Filter out nulls (in case populate/match removes)
//   const validPosts = posts.filter((post) => post.user);

//   res.json(validPosts);
// });

// // @desc    Get single post
// // @route   GET /api/posts/:id
// // @access  Public
// const getPostById = asyncHandler(async (req, res) => {
//   const post = await Post.findById(req.params.id).populate({
//     path: "user",
//     populate: { path: "user", select: "name" },
//     select: "shopName status",
//   });

//   if (!post || post.user.status !== "approved") {
//     res.status(404);
//     throw new Error("Post not found");
//   }

//   res.json(post);
// });

// module.exports = {
//   createPost,
//   getPosts,
//   getPostById,
// };
