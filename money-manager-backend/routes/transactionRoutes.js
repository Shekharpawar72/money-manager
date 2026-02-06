const {protect} = require("../middleware/authMiddleware")
const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  editTransaction,
} = require("../controllers/transactionController");

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, editTransaction);

module.exports = router;
