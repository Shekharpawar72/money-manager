// const Transaction = require("../models/transactionModel");


// // ➕ Add Income / Expense
// exports.addTransaction = async (req, res) => {
//   try {
//     req.body.user = req.user._id || req.user.id;
//     if (!req.body.accountId) {
//       return res.status(400).json({ error: "Account is required" });
//     }
//     const transaction = await Transaction.create(req.body);
//     res.status(201).json(transaction);
//   }catch (error) {
//     console.error("Error adding transaction:", error.message); // Helpful for debugging
//     res.status(400).json({ error: error.message });
//   }
// };


// // 📄 Get Transactions with Filters
// exports.getTransactions = async (req, res) => {
//   try {
//     const { start, end, category, division, type } = req.query;

//     let filter = {};

//     if (type) filter.type = type;
//     if (category) filter.category = category;
//     if (division) filter.division = division;

//     if (start && end) {
//       filter.date = {
//         $gte: new Date(start),
//         $lte: new Date(end),
//       };
//     }

//     const transactions = await Transaction.find(filter).sort({ date: -1 });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // ✏️ Edit Transaction (12 Hour Restriction)
// exports.editTransaction = async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     const diff =
//       Date.now() - new Date(transaction.createdAt).getTime();

//     if (diff > 12 * 60 * 60 * 1000) {
//       return res.status(403).json({
//         message: "Editing not allowed after 12 hours",
//       });
//     }

//     const updated = await Transaction.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel"); // 🟢 REQUIRED to update balance

// ➕ Add Income / Expense & Update Balance
exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, accountId, category, description, division, date } = req.body;

    // 1. Basic Validation
    if (!accountId) {
      return res.status(400).json({ error: "Account is required" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    // 2. Find the Account to ensure it exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // 3. Create the Transaction
    const transaction = await Transaction.create({
      user: req.user._id || req.user.id, // Link to logged-in user
      accountId,
      type,
      amount,
      category,
      description,
      division,
      date
    });

    // 4. 🟢 UPDATE ACCOUNT BALANCE LOGIC
    // If it's income, add money. If expense, subtract money.
    if (type === "income") {
      account.balance += Number(amount);
    } else if (type === "expense") {
      account.balance -= Number(amount);
    }
    
    await account.save(); // Save the new balance to DB

    res.status(201).json(transaction);
  } catch (error) {
    // 🔍 THIS LOGS THE SPECIFIC ERROR TO YOUR TERMINAL
    console.error("Error adding transaction:", error.message); 
    res.status(400).json({ error: error.message });
  }
};

// 📄 Get Transactions (User Specific)
exports.getTransactions = async (req, res) => {
  try {
    const { start, end, category, division, type } = req.query;

    // 🟢 FILTER BY USER (Important: Only show MY transactions)
    let filter = { user: req.user._id || req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (division) filter.division = division;

    if (start && end) {
      filter.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Edit Transaction
exports.editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // Restriction: Cannot edit after 12 hours
    const diff = Date.now() - new Date(transaction.createdAt).getTime();
    if (diff > 12 * 60 * 60 * 1000) {
      return res.status(403).json({ message: "Editing not allowed after 12 hours" });
    }

    // 🟢 Revert old balance and apply new balance if amount changed
    if (req.body.amount) {
        const account = await Account.findById(transaction.accountId);
        if (account) {
            // Revert old amount
            if (transaction.type === 'income') account.balance -= transaction.amount;
            else account.balance += transaction.amount;
            
            // Apply new amount
            const newAmount = Number(req.body.amount);
            if (transaction.type === 'income') account.balance += newAmount;
            else account.balance -= newAmount;
            
            await account.save();
        }
    }

    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // 🟢 Revert balance before deleting
    const account = await Account.findById(transaction.accountId);
    if (account) {
        if (transaction.type === 'income') account.balance -= transaction.amount;
        else account.balance += transaction.amount;
        await account.save();
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
