const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    services: [
      {
        type: String, // stitching, alteration, blouse, kurta etc.
      },
    ],
    priceRange: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // years
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending', // admin approval later
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tailor", tailorSchema);
