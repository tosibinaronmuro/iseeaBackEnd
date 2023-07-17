const express = require("express");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reports/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();
const {
  deleteReport,
  createReport,
  getAllReports,
  UpdateReport,
} = require("../controllers/annual-report");
const authMiddleware = require("../middleware/auth");

router.route("/").get(getAllReports);
router
  .route("/")
  .post(authMiddleware, upload.single("reportFile"), createReport);
router
  .route("/:id")
  .patch(authMiddleware, UpdateReport)
  .delete(authMiddleware, deleteReport);

module.exports = router;
