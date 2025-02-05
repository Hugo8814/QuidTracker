const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const trueLayerRoutes = require("./routes/truelayerRoutes.cjs");
//const trueLayerRoutes = require("./routes/trueLayerRoutes.cjs");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// 1) midware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});

// 2) ROUTES
app.use("/api/truelayer", trueLayerRoutes);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/connect";

app.post("/get-token", async (req, res) => {
  const { code } = req.body; // Change this line
  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }
  try {
    const tokenResponse = await fetch(
      "https://auth.truelayer-sandbox.com/connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      }
    );
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error(JSON.stringify(tokenData));
    }
    res.json(tokenData); // Send access token back to frontend
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
