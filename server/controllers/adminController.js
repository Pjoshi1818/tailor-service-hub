const Tailor = require("../models/Tailor");

// 🔍 GET all unapproved tailors
exports.getPendingTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find({ isApproved: false })
      .populate("user", "name email");

    res.json(tailors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveTailor = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id);

    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    tailor.isApproved = true;
    await tailor.save();

    res.json({ message: "Tailor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
