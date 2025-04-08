const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/apiRoutes.cjs");
const trueLayerRoutes = require("./routes/trueLayerRoutes.cjs");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes.cjs");

dotenv.config(); // Load environment variables from .env fil

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 2) ROUTES
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});
app.use("/api/truelayer", trueLayerRoutes);

app.use("/api/auth", authRouter);

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use("/api/users/balance/:userId", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

module.exports = app;
