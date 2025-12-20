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

// TAILOR → VIEW RECEIVED ORDERS (FIXED)
exports.getTailorOrders = async (req, res) => {
  try {
    // 1. Logged-in user se Tailor profile nikalo
    const tailorProfile = await Tailor.findOne({ user: req.user._id });

    if (!tailorProfile) {
      return res.status(404).json({ message: "Tailor profile not found" });
    }

    // 2. Tailor ID se orders nikalo
    const orders = await Order.find({ tailor: tailorProfile._id })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TAILOR → UPDATE STATUS (FIXED & SECURE)
exports.updateOrderStatus = async (req, res) => {
  try {
    // 1. Tailor profile nikalo
    const tailorProfile = await Tailor.findOne({ user: req.user._id });

    if (!tailorProfile) {
      return res.status(404).json({ message: "Tailor profile not found" });
    }

    // 2. Order nikalo
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 3. Check karo ye order isi tailor ka hai ya nahi
    if (order.tailor.toString() !== tailorProfile._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
