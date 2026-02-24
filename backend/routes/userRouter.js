const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware");
const { User } = require("../db");

const router = express.Router();

/* ===================== SIGNUP ===================== */
router.post("/signup", async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;

    if (!username || !firstName || !lastName || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: username,        // ⭐ keeps compatibility
      firstName,
      lastName,
      password: hashedPassword,
    balance: Math.floor(Math.random() * (5000000 - 1000 + 1)) + 1000
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ message: "User created successfully", token });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});
/* ===================== SIGNIN ===================== */
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    console.error("SIGNIN ERROR:", err);
    res.status(500).json({ message: "Signin failed" });
  }
});

/* ===================== CURRENT USER ===================== */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("firstName lastName email balance");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

/* ===================== GET USERS (SEND MONEY) ===================== */
router.get("/bulk", auth, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } }
      ]
    }).select("_id firstName lastName");

    res.json({ users });
  } catch (err) {
    console.error("BULK ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
