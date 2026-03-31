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
    const { location, service, priceRange, experience } = req.query;

    // Build query object - always filter by approved status
    const query = { status: "approved" };

    // Add optional filters
    if (location) {
      query.location = new RegExp(location, "i");
    }

    if (service) {
      query.services = { $in: [new RegExp(service, "i")] };
    }

    if (priceRange) {
      query.priceRange = priceRange;
    }

    if (experience) {
      query.experience = { $gte: Number(experience) };
    }

    const tailors = await Tailor.find(query).populate("user", "name email");
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
      "name email",
    );

    if (!tailor) {
      return res.status(404).json({ message: "Tailor not found" });
    }

    res.json(tailor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
