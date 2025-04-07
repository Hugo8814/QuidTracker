const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directDebitSchema = new Schema({
  userId: { type: String, required: true },
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
}
, { timestamps: true });

const DirectDebit = mongoose.model("DirectDebit", directDebitSchema);

module.exports = DirectDebit;
