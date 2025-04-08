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
    const directDebits = await getUserDirectDebits(
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

    // Return a structured response
    res.json({
      success: true,
      userInfo,
      accounts,
      balances,
      transactions,
      directDebits,
      standingOrders,
      authUser,
    });
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

router.get('/bank-logo/*', async (req, res) => {
  try {
    // Get the full URL from the path by removing '/bank-logo/'
    const logoUrl = req.params[0];
    
    console.log('Attempting to fetch logo from:', logoUrl);

    const response = await fetch(logoUrl);
    
    if (!response.ok) {
      console.error('Logo fetch failed with status:', response.status);
      throw new Error(`Failed to fetch logo: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // Forward the content type
    res.set('Content-Type', contentType);
    
    // Stream the response
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching bank logo:', error);
    res.status(500).json({ error: 'Failed to fetch bank logo' });
  }
});

module.exports = router;
