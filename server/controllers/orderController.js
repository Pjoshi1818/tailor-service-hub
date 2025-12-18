const Order = require("../models/Order");
const Tailor = require("../models/Tailor");

// CUSTOMER → PLACE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { tailorId, serviceType, description, price } = req.body;

    const tailor = await Tailor.findById(tailorId);
    if (!tailor || !tailor.isApproved) {
      return res.status(400).json({ message: "Invalid tailor" });
    }

    const order = await Order.create({
      customer: req.user._id,
      tailor: tailorId,
      serviceType,
      description,
      price,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CUSTOMER → VIEW OWN ORDERS
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("tailor")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TAILOR → VIEW RECEIVED ORDERS
exports.getTailorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ tailor: req.user._id })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TAILOR → UPDATE STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
