const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getReport,
  categorySummary,
} = require("../controllers/reportController");

router.get("/", protect, getReport);
router.get("/categories", protect, categorySummary);

module.exports = router;
