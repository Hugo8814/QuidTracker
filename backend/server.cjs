const mongoose = require("mongoose");
const app = require("./app.cjs");
require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
