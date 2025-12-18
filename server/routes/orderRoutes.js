const express = require("express");
const router = express.Router();
const {
  createOrder,
  getCustomerOrders,
  getTailorOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// Customer places order
router.post("/", protect, allowRoles("customer"), createOrder);

// Customer views own orders
router.get("/my", protect, allowRoles("customer"), getCustomerOrders);

// Tailor views received orders
router.get("/tailor", protect, allowRoles("tailor"), getTailorOrders);

// Tailor updates order status
router.put(
  "/:id/status",
  protect,
  allowRoles("tailor"),
  updateOrderStatus
);

module.exports = router;
