const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const trueLayerRoutes = require("./routes/truelayerRoutes.cjs");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes.cjs");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction.cjs");
//const trueLayerRoutes = require("./routes/trueLayerRoutes.cjs");

dotenv.config(); // Load environment variables from .env file

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});
//

// 2) ROUTES
app.use("/api/truelayer", trueLayerRoutes);

app.use("/api/auth", authRouter);

const userId = new mongoose.Types.ObjectId();

const Balance = require("./models/Balance.cjs");

const cardBalance = new Balance({
  userID: userId,
  type: "card",
  currency: "GBP",
  available: 99.0,
  current: 21.0,
  credit_limit: 120.0,
  last_statement_date: "2025-03-06T00:00:00Z",
  last_statement_balance: 2.0,
  payment_due: 3.0,
  payment_due_date: "2025-04-01T00:00:00Z",
  update_timestamp: "2025-03-10T03:23:32.8191776Z",
});
cardBalance
  .save()
  .then(() => {
    console.log("Card balance saved");
  })
  .catch((err) => {
    console.error("Error saving card balance:", err);
  });

const accountBalance = new Balance({
  userID: userId,
  type: "account",
  currency: "GBP",
  available: 111.0,
  current: 11.0,
  overdraft: 100.0,
  update_timestamp: "2025-03-10T03:25:44.7706046Z",
});

accountBalance
  .save()
  .then(() => {
    console.log("Card balance saved");
  })
  .catch((err) => {
    console.error("Error saving card balance:", err);
  });

module.exports = app;
