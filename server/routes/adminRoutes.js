const express = require("express");
const router = express.Router();

const {
  getPendingTailors,
  approveTailor,
  rejectTailor,
  getAllTailors,
  getAllCustomers,
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

// REJECT tailor
router.put(
  "/reject-tailor/:id",
  protect,
  isAdmin,
  rejectTailor
);

// GET all tailors
router.get(
  "/all-tailors",
  protect,
  isAdmin,
  getAllTailors
);

// GET all customers
router.get(
  "/all-customers",
  protect,
  isAdmin,
  getAllCustomers
);

module.exports = router;
