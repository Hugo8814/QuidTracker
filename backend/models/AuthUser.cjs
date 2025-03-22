const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Other authentication-related fields, e.g. username, etc.
});

const AuthUser = mongoose.model("AuthUser", authUserSchema);

module.exports = AuthUser;