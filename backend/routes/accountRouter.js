const express = require("express");
const auth = require("../middleware");
const { User } = require("../db");

const router = express.Router();

/* ===================== BALANCE ===================== */
router.get("/balance", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("transactions.to", "firstName")
      .populate("transactions.from", "firstName");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      balance: user.balance,
      firstName: user.firstName,      // ✅ for greeting
      transactions: user.transactions // ✅ for history
    });

  } catch (err) {
    console.error("BALANCE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch balance" });
  }
});


/* ===================== TRANSFER ===================== */
router.post("/transfer", auth, async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer data" });
    }

    const fromUser = await User.findById(req.userId);
    const toUser = await User.findById(to);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // ✅ Update balances
    fromUser.balance -= amount;
    toUser.balance += amount;

    // ✅ Save transaction for sender (DEBIT)
    fromUser.transactions.push({
      type: "debit",
      amount: amount,
      to: toUser._id,
      from: fromUser._id,
      date: new Date()
    });

    // ✅ Save transaction for receiver (CREDIT)
    toUser.transactions.push({
      type: "credit",
      amount: amount,
      to: toUser._id,
      from: fromUser._id,
      date: new Date()
    });

    await fromUser.save();
    await toUser.save();

    res.json({ message: "Transfer successful" });

  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    res.status(500).json({ message: "Transfer failed" });
  }
});

module.exports = router;