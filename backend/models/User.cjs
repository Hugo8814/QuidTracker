const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  userId: { type: String, required: true },
  update_timestamp: { type: Date, required: true },
  full_name: { type: String, required: true },
  addresses: [
    {
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String },
      postalCode: { type: String },
      county: { type: String },
      country: { type: String, required: true },
    },
  ],
  emails: [{ type: String, required: true }],
  phones: [{ type: String, required: true }],
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
