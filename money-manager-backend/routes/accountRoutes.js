const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  transferAmount,
} = require("../controllers/accountController.js");
const {protect} = require("../middleware/authMiddleware");

router.post("/", protect , createAccount);
router.get("/", protect, getAccounts);
router.post("/transfer", protect, transferAmount);

module.exports = router;
