const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserAccounts,
  getUserCards,
  getAccountBalance,
  getCardBalance,
  getAllBalances,
  getAllTransactions,
  getAllStandingOrders,
  getAllDirectDebits,
  getUserBalance,
  getOverviewData
} = require("../controller/userController.cjs");

const userRouter = express.Router();
const accountRouter = express.Router();
const cardRouter = express.Router();
const transactionRouter = express.Router();
const balanceRouter = express.Router();

//user
userRouter.get("/:userId", getUser);
userRouter.get("/:userId/overview", getOverviewData);

//balance
balanceRouter.get("/balance/:accountId", getUserBalance);
balanceRouter.get("/balances/:userId", getAllBalances);
accountRouter.get("/:userId/balance", getAccountBalance);
cardRouter.get("/:userId/balance", getCardBalance);

//accounts
accountRouter.get("/:userId", getUserAccounts);

//cards
cardRouter.get("/:userId", getUserCards);

//transactions
transactionRouter.get("/transactions/:userId", getAllTransactions);
transactionRouter.get("/standingOrders/:userId", getAllStandingOrders);
transactionRouter.get("/directDebits/:userId", getAllDirectDebits);

router.use("/users", userRouter);
router.use("/users/accounts", accountRouter);
router.use("/users/cards", cardRouter);
router.use("/users", transactionRouter);
router.use("/users", balanceRouter);


module.exports = router;

