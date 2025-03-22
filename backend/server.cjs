const mongoose = require("mongoose");
const app = require("./app.cjs");

require("dotenv").config({ path: ".env" });

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const AuthUser = require("./models/AuthUser.cjs");

// When a user signs up
const authUser = new AuthUser({
  _id: new mongoose.Types.ObjectId(),
  email: "user234@example.com",
  password: "password1234",
});

authUser.save();
console.log("User saved successfully!");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
