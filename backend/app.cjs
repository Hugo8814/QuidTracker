const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const trueLayerRoutes = require("./routes/truelayerRoutes.cjs");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes.cjs");
const mongoose = require("mongoose");


dotenv.config(); // Load environment variables from .env file

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});
//

// 2) ROUTES
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
})
app.use("/api/truelayer", trueLayerRoutes);

app.use("/api/auth", authRouter);



const userId = new mongoose.Types.ObjectId();



module.exports = app;
