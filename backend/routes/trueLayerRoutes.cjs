const express = require("express");
const AuthUser = require("../models/AuthUser.cjs");
const {
  getUserInfo,
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
  getUserStandingOders,
} = require("../services/trueLayerService.cjs");
const router = express.Router();

router.post("/store-user-data", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const userId = req.body.userId;
  console.log(userId, "userid");

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const userInfo = await getUserInfo(accessToken, userId);
     const accounts = await getUserAccounts(accessToken , userId);
     const balances = await getUserBalances(accounts, accessToken, userId);
     const transactions = await getUserTransactions(accounts, accessToken, userId);
    const directDebit = await getUserDirectDebits(accounts, accessToken, userId);
     const standingOrders = await getUserStandingOders(accounts, accessToken, userId);

    

    res.json(
      `success: ,\n ${userInfo},\n ${accounts},\n ${transactions},\n ${directDebit}, ${standingOrders} `
    );
    // res.json("success");
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});



module.exports = router;
