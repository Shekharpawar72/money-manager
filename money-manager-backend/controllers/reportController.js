const Transaction = require("../models/transactionModel");

// 📊 Monthly / Weekly / Yearly Reports
exports.getReport = async (req, res) => {
  try {
    let groupBy;

    switch (req.query.period) {
      case "week":
        groupBy = { $week: "$date" };
        break;
      case "month":
        groupBy = { $month: "$date" };
        break;
      case "year":
        groupBy = { $year: "$date" };
        break;
      default:
        groupBy = { $month: "$date" };
    }

    const mongoose = require("mongoose");
    const userId = req.user._id || req.user.id;

    const report = await Transaction.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: {
            period: groupBy,
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📌 Category Summary
exports.categorySummary = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const userId = req.user._id || req.user.id;

    const summary = await Transaction.aggregate([
      {
        $match: { 
          type: "expense",
          user: new mongoose.Types.ObjectId(userId)
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
