const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserAccounts,
  getUserCards,
  getAccountBalance,
  getCardBalance,
  getAllBalances
} = require("../controller/userController.cjs");

router.get("/users/:userId", getUser);
router.get("/users/accounts/:userId", getUserAccounts);
router.get("/users/cards/:userId", getUserCards);
router.get("/users/accounts/:userId/balance", getAccountBalance);
router.get("/users/cards/:userId/balance", getCardBalance);
router.get("/users/balances/:userId", getAllBalances);


module.exports = router;
