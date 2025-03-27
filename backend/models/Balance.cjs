const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
  userId: { type: String, required: true },
  accountId: { type: String, required: true },
  type: { type: String, enum: ["card", "account"] },
  currency: String,
  available: Number,
  current: Number,
  credit_limit: Number,
  overdraft: Number,
  last_statement_date: Date,
  last_statement_balance: Number,
  payment_due: Number,
  payment_due_date: Date,
  update_timestamp: Date,
});

const Balance = mongoose.model("Balance", BalanceSchema);
module.exports = Balance;

