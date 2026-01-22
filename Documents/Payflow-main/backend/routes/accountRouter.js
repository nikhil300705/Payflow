const express = require("express");
const auth = require("../middleware");
const { User } = require("../db");

const router = express.Router();

/* ===================== BALANCE ===================== */
router.get("/balance", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ balance: user.balance });
  } catch (err) {
    console.error("BALANCE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch balance" });
  }
});

/* ===================== TRANSFER ===================== */
router.post("/transfer", auth, async (req, res) => {
  try {
    const { to, amount } = req.body;

    console.log("TRANSFER BODY:", req.body); // 🔍 debug

    if (!to || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer data" });
    }

    const fromUser = await User.findById(req.userId);
    const toUser = await User.findById(to);

    if (!toUser) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save();
    await toUser.save();

    res.json({ message: "Transfer successful" });
  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    res.status(500).json({ message: "Transfer failed" });
  }
});

module.exports = router;


module.exports = router;
