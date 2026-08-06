const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// GET logged-in customer's profile
router.get("/profile", protect, allowRoles("customer"), getMyProfile);

// PUT update logged-in customer's profile
router.put("/profile", protect, allowRoles("customer"), updateMyProfile);

module.exports = router;
