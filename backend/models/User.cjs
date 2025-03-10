const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  updateTimestamp: { type: Date, required: true },
  fullName: { type: String, required: true },
  addresses: [
    {
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  emails: [{ type: String, required: true }],
  phones: [{ type: String, required: true }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

