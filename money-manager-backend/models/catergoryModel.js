const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["income", "expense"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
