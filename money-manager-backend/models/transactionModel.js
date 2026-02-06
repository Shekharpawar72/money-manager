const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "transfer"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    division: {
      type: String,
      // 🔴 FIX: Updated enums to Title Case to match Frontend ("Office", "Personal")
      enum: ["Office", "Personal"], 
      required: [true, "Please select a division"],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);