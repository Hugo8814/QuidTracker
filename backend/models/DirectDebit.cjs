const mongoose = require("mongoose");

const directDebitSchema = new mongoose.Schema({
  direct_debit_id: String,
  timestamp: Date,
  name: String,
  status: String,
  previous_payment_amount: Number,
  currency: String,
  meta: {
    provider_account_id: String,
    provider_mandate_identification: String,
  },
  account_id: { type: String, ref: "Account" },
});

const DirectDebit = mongoose.model("DirectDebit", directDebitSchema);

module.exports = DirectDebit;
