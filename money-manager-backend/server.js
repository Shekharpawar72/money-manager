// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/transactions", require("./routes/transactionRoutes"));
// app.use("/api/reports", require("./routes/reportRoutes"));
// app.use("/api/accounts", require("./routes/accountRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (FIX)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Money Manager Backend API is running 🚀",
    availableRoutes: {
      auth: "/api/auth",
      transactions: "/api/transactions",
      reports: "/api/reports",
      accounts: "/api/accounts"
    }
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/accounts", require("./routes/accountRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
