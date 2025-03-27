const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  
});

const AuthUser = mongoose.model("AuthUser", authUserSchema);

module.exports = AuthUser;

