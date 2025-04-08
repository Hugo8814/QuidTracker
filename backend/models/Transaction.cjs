const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the transaction schema
// const transactionSchema = new Schema(
//   {
//     userId: { type: String, required: true },
//     timestamp: { type: Date, required: true }, // Timestamp of the transaction
//     description: { type: String, required: true }, // Description of the transaction
//     transaction_type: {
//       type: String,

//       required: true,
//     },
//     transaction_category: { type: String },
//     transaction_classification: [{ type: String }],
//     currency: { type: String, required: true, enum: ["GBP"] },
//     transaction_id: { type: String, required: true },
//     provider_transaction_id: { type: String, required: true },
//     normalised_provider_transaction_id: { type: String, required: true },
//     running_balance: {
//       currency: { type: String, enum: ["GBP"] },
//       amount: { type: Number },
//     },
//     meta: {
//       provider_transaction_category: { type: String },
//     },
//     account_id: { type: String },
//     card_id: { type: String },
//     pending: { type: Boolean, required: true },
//   },
//   { timestamps: true }
// );

const transactionSchema = new Schema(
  {
    userId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    description: { type: String, required: true },
    transaction_type: { type: String, required: true },
    transaction_category: { type: String },
    transaction_classification: [{ type: String }],
    currency: { type: String, required: true },
    transaction_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    card_id: { type: String },
    account_id: { type: String },
    pending: { type: Boolean, required: true },
    meta: {
      provider_reference: String,
      provider_merchant_name: String,
      address: String,
      transaction_type: String,
    },
    // Optional fields that might be provided by some banks
    normalised_provider_transaction_id: { type: String, required: false },
    provider_transaction_id: { type: String, required: false },
  },
  { timestamps: true }
);

// Create the model from the schema
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
