const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const transactionSchema = new mongoose.Schema({
  type: String, // debit or credit
  amount: Number,
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  balance: {
    type: Number,
    default: 10000
  },
  transactions: [transactionSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};