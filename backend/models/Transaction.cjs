const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the transaction schema
const transactionSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
  timestamp: { type: Date, required: true },  // Timestamp of the transaction
  description: { type: String, required: true },  // Description of the transaction
  transactionType: { 
    type: String, 
    enum: ['ACCOUNT', 'CARD'],  // 'ACCOUNT' or 'CARD' to distinguish between transaction types
    required: true 
  },
  transactionCategory: { type: String },  // Optional, categorization (e.g., 'Expense', 'Deposit', 'Payment')
  transactionClassification: [{ type: String }],  // Optional, multiple classifications (e.g., 'Utility', 'Food', etc.)
  amount: { type: Number, required: true },  // The amount of the transaction
  currency: { type: String, required: true, enum: ['GBP'] },  // The currency used (e.g., 'GBP')
  transactionId: { type: String, required: true },  // A unique identifier for the transaction
  providerTransactionId: { type: String, required: true },  // Unique provider transaction ID
  normalisedProviderTransactionId: { type: String, required: true },  // Normalized transaction ID
  runningBalance: {
    currency: { type: String, required: true, enum: ['GBP'] },
    amount: { type: Number, required: true }
  },
  meta: {
    providerTransactionCategory: { type: String }  // Optional, metadata about the provider's transaction category
  },
  // For card transactions, you'll store the card reference; for account transactions, you'll store the account reference
  account_id: { type: Schema.Types.ObjectId, ref: 'Account' },  // Optional, for account transactions
  card_id: { type: Schema.Types.ObjectId, ref: 'Card' },  // Optional, for card transactions
}, { timestamps: true });  // Automatically adds createdAt and updatedAt

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
