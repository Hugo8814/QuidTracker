const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/connect";

exports.getToken = async (req, res) => {
  console.log("Request body:", req.body);
  const { code } = req.body;
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
};
