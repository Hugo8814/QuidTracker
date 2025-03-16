const express = require("express");
const {
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
} = require("../services/trueLayerService.cjs");
const router = express.Router();

router.get("/store-user-data", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const data = await getUserAccounts(accessToken);
    const balances = await getUserBalances(data, accessToken);
    //const transactions = await getUserTransactions(data, accessToken);
    //const directDebit = await getUserDirectDebits(data, accessToken);

    console.log("worked");
    res.json("worked hugo your a hero");
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// router.get('/all-data', async (req, res) => {
//   try {
//     const accountData = await Account.find().exec();
//     const balanceData = await Balance.find().exec();
//     const transactionData = await Transaction.find().exec();
//     const userData = await User.find().exec();

//     const allData = [...accountData, ...balanceData, ...transactionData, ...userData];

//     // Add pending type as needed
//     allData.forEach((item) => {
//       if (item.type === 'pending') {
//         item.pending = true;
//       }
//     });

//     res.json(allData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch all data' });
//   }
// });

module.exports = router;
