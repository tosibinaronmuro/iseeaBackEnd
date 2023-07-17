const express = require("express");
const router = express.Router();
const {
  deleteimpactNumber,
  createimpactNumber,
  getAllimpactNumbers,
  UpdateimpactNumber,
} = require("../controllers/impact-numbers.js");
const authMiddleware = require("../middleware/auth");

router.route("/").get(getAllimpactNumbers);
router.route("/").post(authMiddleware, createimpactNumber);

router
  .route("/:id")
  .patch(authMiddleware, UpdateimpactNumber)
  // .delete(authMiddleware, deleteimpactNumber);

module.exports = router;
