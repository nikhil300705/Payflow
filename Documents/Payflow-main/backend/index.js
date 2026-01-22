require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/mainRouter");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => process.exit(1));

app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
