const Tailor = require("../models/Tailor");
const User = require("../models/User");

// 🔍 GET all pending tailors
exports.getPendingTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find({ status: 'pending' })
      .populate("user", "name email");

    res.json(tailors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve tailor
exports.approveTailor = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id);

    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    tailor.status = 'approved';
    await tailor.save();

    res.json({ message: "Tailor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Reject tailor
exports.rejectTailor = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id);

    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    tailor.status = 'rejected';
    await tailor.save();

    res.json({ message: "Tailor rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 GET all tailors
exports.getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find({})
      .populate("user", "name email");

    res.json(tailors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👥 GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
