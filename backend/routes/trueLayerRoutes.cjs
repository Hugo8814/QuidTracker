const express = require("express");
const { storeUserToken } = require("../controller/authController.cjs");
const {
  getUserInfo,
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
  getUserStandingOders,
  refreshUserToken, // Import the new service function
} = require("../services/trueLayerService.cjs");

const router = express.Router();

// Existing route
router.post("/store-user-data", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const userId = req.body.userId;
  const refreshToken = req.body.refresh_token; // Assuming you want to use this in the future
  console.log(userId, "userid");

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const userInfo = await getUserInfo(accessToken, userId);
    const accounts = await getUserAccounts(accessToken, userId);
    const balances = await getUserBalances(accounts, accessToken, userId);
    const transactions = await getUserTransactions(
      accounts,
      accessToken,
      userId
    );
    const directDebit = await getUserDirectDebits(
      accounts,
      accessToken,
      userId
    );
    const standingOrders = await getUserStandingOders(
      accounts,
      accessToken,
      userId
    );
    const authUser = await storeUserToken(userId, accessToken, refreshToken);

    res.json(
      `success: ,\n ${userInfo},\n ${accounts},\n ${transactions},\n ${directDebit}, ${standingOrders} ,\n ${balances} ,\n ${authUser}`
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// New route for refreshing the token
router.post("/refresh-token", async (req, res) => {
  const userId = req.body.userId;
  const refreshToken = req.body.refresh_token; // Assuming you want to use this in the future

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const refreshedToken = await refreshUserToken(userId, refreshToken); // Call the service function
    await storeUserToken(userId, refreshedToken); // Store the refreshed token
    res.json({ success: true, token: refreshedToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

module.exports = router;
