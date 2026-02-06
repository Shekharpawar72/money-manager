const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");

// ➕ Create Account
exports.createAccount = async (req, res) => {
  try {
    req.body.user = req.user._id || req.user.id;
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get All Accounts (THIS WAS MISSING)
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id || req.user.id });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔄 Transfer Amount
exports.transferAmount = async (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct from sender
    fromAccount.balance -= amount;
    await fromAccount.save();

    // Add to receiver
    toAccount.balance += amount;
    await toAccount.save();

    // Record the transaction (Optional: Create an expense record for tracking)
    await Transaction.create({
      amount,
      description: `Transfer to ${toAccount.name}`,
      category: "Transfer",
      division: "Personal",
      date: new Date(),
      type: "expense",
      accountId: fromAccountId // Link to sender
    });

    res.json({ message: "Transfer successful", fromAccount, toAccount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};