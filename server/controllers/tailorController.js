const Tailor = require("../models/Tailor");

// CREATE TAILOR PROFILE
exports.createTailorProfile = async (req, res) => {
  try {
    const tailorExists = await Tailor.findOne({ user: req.user._id });
    if (tailorExists) {
      return res.status(400).json({ message: "Tailor profile already exists" });
    }

    const tailor = await Tailor.create({
      user: req.user._id,
      shopName: req.body.shopName,
      services: req.body.services,
      priceRange: req.body.priceRange,
      location: req.body.location,
      experience: req.body.experience,
    });

    res.status(201).json(tailor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPROVED TAILORS (CUSTOMER)
exports.getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find({ isApproved: true }).populate(
      "user",
      "name email"
    );
    res.json(tailors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TAILOR
exports.getTailorById = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    res.json(tailor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
