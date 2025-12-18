const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Only admin
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.send("Welcome Admin");
});

// Only tailor
router.get("/tailor", protect, allowRoles("tailor"), (req, res) => {
  res.send("Welcome Tailor");
});

module.exports = router;
