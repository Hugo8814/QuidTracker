const fetch = require("node-fetch");
const dotenv = require("dotenv");
const base64 = require("base64-js");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const CLIENT_ID = "quidtracker-48cd14";
const CLIENT_SECRET = "a8b948ed-a40b-4d72-a612-f84a75dab83a";
const REDIRECT_URI = "http://localhost:5173/connect";

const AuthUser = require("../models/AuthUser.cjs");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // Registration logic here
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const authUser = new AuthUser(req.body);
  authUser.save();
  res.json({ message: "User registered successfully", user: authUser });

};

const login = async (req, res) => {
  // Login logic here
};

const authenticate = async (req, res, next) => {
  // Authentication middleware logic here
};

const getToken = async (req, res) => {
  console.log("Request body:", req.body);
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }
  try {
    const tokenResponse = await fetch(
      `https://auth.truelayer.com/connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      }
    );
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error(JSON.stringify(tokenData));
    }
    res.json(tokenData);
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
};

module.exports = { register, login, authenticate, getToken };
