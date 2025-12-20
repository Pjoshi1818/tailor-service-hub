const express = require("express");
const router = express.Router();

const {
  getPendingTailors,
  approveTailor,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// GET pending tailors
router.get(
  "/pending-tailors",
  protect,
  isAdmin,
  getPendingTailors
);

// APPROVE tailor
router.put(
  "/approve-tailor/:id",
  protect,
  isAdmin,
  approveTailor
);

module.exports = router;
