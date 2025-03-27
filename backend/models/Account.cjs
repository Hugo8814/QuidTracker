const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseSchema = new Schema({
  userId: { type: String, required: true },
  account_id: { type: String, required: true },
  currency: { type: String, required: true },
  display_name: { type: String, required: true },
  update_timestamp: { type: Date, required: true },
  provider: {
    display_name: { type: String, required: true },
    provider_id: { type: String, required: true },
    logo_uri: { type: String, required: true },
  },
});

const accountSchema = new Schema({
  account_type: {
    type: String,
    required: true,
    enum: ["TRANSACTION", "SAVINGS"],
  },
  account_number: {
    iban: { type: String, required: true },
    swift_bic: { type: String, required: true },
    number: { type: String, required: true },
    sort_code: { type: String, required: true },
  },
});

const cardSchema = new Schema({
  card_network: { type: String, required: true, enum: ["MASTERCARD", "VISA"] },
  card_type: { type: String, required: true, enum: ["CREDIT"] },
  partial_card_number: { type: String, required: true },
  name_on_card: { type: String, required: true },
});

const FinancialInstrument = mongoose.model("FinancialInstrument", baseSchema);

const Account = FinancialInstrument.discriminator("Account", accountSchema);
const Card = FinancialInstrument.discriminator("Card", cardSchema);

module.exports = { Card, Account };
