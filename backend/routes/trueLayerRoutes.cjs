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
    //const accounts = await getUserAccounts(accessToken);
    //const balances = await getUserBalances(accounts, accessToken);
    //const transactions = await getUserTransactions(accounts, accessToken);
    //const directDebit = await getUserDirectDebits(accounts, accessToken);
    //const standingOrders = await getUserStandingOders(accounts, accessToken);

    console.log("worked", userInfo);

    // res.json(
    //   `success: ,\n ${userInfo},\n ${accounts},\n ${transactions},\n ${directDebit}, ${standingOrders} `
    // );

    res.json({ success: true });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

async function retrieveUserId(req) {
  try {
    console.log(req.userId);
    const user = await AuthUser.findOne({ email: req.user.email });
    const userId = user._id;
    return userId;
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
