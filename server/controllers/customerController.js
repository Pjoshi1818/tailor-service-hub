const User = require("../models/User");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

// Fields that can never be changed through the profile endpoint
const PROTECTED_FIELDS = [
  "password",
  "role",
  "isAdmin",
  "blocked",
  "_id",
  "id",
  "__v",
  "createdAt",
  "updatedAt",
];

// GET /api/customer/profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      avatar: user.avatar || "",
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/customer/profile
exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Extract only allowed fields and trim whitespace
    const { name, email, phone, address, avatar } = req.body || {};

    // Block attempts to change sensitive/internal fields
    const hasProtected = Object.keys(req.body || {}).some((key) =>
      PROTECTED_FIELDS.includes(key),
    );
    if (hasProtected) {
      return res
        .status(400)
        .json({ message: "Sensitive fields cannot be updated" });
    }

    // Full name is required
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    // Valid email is required
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    // Phone validation (optional — only if provided)
    let trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    if (trimmedPhone && !PHONE_REGEX.test(trimmedPhone)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid phone number" });
    }

    // Prevent duplicate email (excluding self)
    if (trimmedEmail.toLowerCase() !== user.email.toLowerCase()) {
      const emailExists = await User.findOne({
        email: { $regex: new RegExp(`^${trimmedEmail}$`, "i") },
        _id: { $ne: user._id },
      });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Apply changes
    user.name = trimmedName;
    user.email = trimmedEmail;
    user.phone = trimmedPhone;
    user.address = typeof address === "string" ? address.trim() : user.address;
    user.avatar = typeof avatar === "string" ? avatar.trim() : user.avatar;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
        avatar: updatedUser.avatar || "",
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    // Handle mongoose duplicate key error gracefully
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: error.message });
  }
};
