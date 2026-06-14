// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Tailor",
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     caption: {
//       type: String,
//       required: true,
//       maxlength: 500,
//     },
//   },
//   { timestamps: true },
// );

// // Index for fast queries
// postSchema.index({ user: 1 });

// module.exports = mongoose.model("Post", postSchema);
