// const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
// const { allowRoles } = require("../middleware/roleMiddleware");
// const {
//   createPost,
//   getPosts,
//   getPostById,
// } = require("../controllers/postController");

// const router = express.Router();

// router.route("/").post(protect, allowRoles("tailor"), createPost).get(getPosts);

// router.route("/:id").get(getPostById);

// module.exports = router;
