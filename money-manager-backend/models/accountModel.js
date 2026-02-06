const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add an account name"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Bank", "Mobile Wallet", "Cash", "Investment", "Other"],
    required: [true, "Please select an account type"],
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Account", accountSchema);