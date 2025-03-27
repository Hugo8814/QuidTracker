const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StandingOrder = new Schema({
  userId: { type: String, required: true },
    frequency: String,
    status: String,
    timestamp: Date,
    currency: String,
    meta: {
      provider_account_id: String,
      provider_standing_order_id: String
    },
    next_payment_date: Date,
    next_payment_amount: Number,
    first_payment_date: Date,
    first_payment_amount: Number,
    final_payment_date: Date,
    final_payment_amount: Number,
    reference: String,
    payee: String,
    account_id: { type: String, ref: "Account" },
  });

  const standingOrder = mongoose.model("standingOrder", StandingOrder);
  module.exports = standingOrder