const express = require("express");
const router = express.Router();
const {
  createTailorProfile,
  getAllTailors,
  getTailorById,
} = require("../controllers/tailorController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// Tailor creates profile
router.post(
  "/",
  protect,
  allowRoles("tailor"),
  createTailorProfile
);

// Customer views tailors
router.get("/", getAllTailors);

// Tailor detail page
router.get("/:id", getTailorById);

module.exports = router;
