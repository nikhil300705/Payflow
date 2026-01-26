require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/mainRouter");

const app = express();


// ================== MIDDLEWARE ==================
app.use(cors({
  origin: "*",   // allow all (safe for now while learning)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


// ================== HEALTH CHECK ==================
app.get("/", (req, res) => {
  res.send("PayFlow backend running 🚀");
});


// ================== ROUTES ==================
app.use("/api/v1", mainRouter);


// ================== MONGODB ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });


// ================== SERVER ==================
const PORT = process.env.PORT || 9100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
