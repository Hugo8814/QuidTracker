const { Card, Account } = require("../models/Account.cjs");
const User = require("../models/User.cjs");
const Balance = require("../models/Balance.cjs");
const Transaction = require("../models/Transaction.cjs");
const DirectDebit = require("../models/DirectDebit.cjs");
const StandingOrder = require("../models/StandingOrder.cjs");

async function getUser(req, res) {
  const userId = req.params.userId.trim();

  const user = await User.findOne({ userId: userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}
async function getUserAccounts(req, res) {
  try {
    const userId = req.params.userId.trim();

    const accounts = await Account.find({ userId: userId });
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: "accounts not found" });
    }

    res.status(200).json({
      status: "success",
      results: accounts.length,
      data: {
        accounts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getUserCards(req, res) {
  try {
    const userId = req.params.userId.trim();

    const cards = await Card.find({ userId: userId });

    if (!cards || cards.length === 0) {
      return res.status(404).json({ error: "cards not found" });
    }

    res.status(200).json({
      status: "success",
      results: cards.length,
      data: {
        cards,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getAllBalances(req, res) {
  try {
    const userId = req.params.userId.trim();

    const balances = await Balance.find({ userId: userId });
    if (!balances || balances.length === 0) {
      return res.status(404).json({ error: "balances not found" });
    }

    res.status(200).json({
      status: "success",
      results: balances.length,
      data: {
        balances,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getAccountBalance(req, res) {
  try {
    const userId = req.params.userId.trim();

    const balances = await Balance.find({ userId: userId, type: "account" });
    if (!balances || balances.length === 0) {
      return res.status(404).json({ error: "balances not found" });
    }

    res.status(200).json({
      status: "success",
      results: balances.length,
      data: {
        balances,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getCardBalance(req, res) {
  try {
    const userId = req.params.userId.trim();

    const balances = await Balance.find({ userId: userId, type: "card" });
    if (!balances || balances.length === 0) {
      return res.status(404).json({ error: "balances not found" });
    }

    res.status(200).json({
      status: "success",
      results: balances.length,
      data: {
        balances,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}
async function getUserBalance(req, res) {
  try {
    const accountId = req.params.accountId.trim();

    const balance = await Balance.findOne({ accountId });
    if (!balance) {
      return res.status(404).json({ error: "balance not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        balance,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getAllTransactions(req, res) {
  try {
    const userId = req.params.userId.trim();

    const transactions = await Transaction.find({ userId: userId });
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "transactions not found" });
    }

    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getAllStandingOrders(req, res) {
  try {
    const userId = req.params.userId.trim();

    const standingOrders = await StandingOrder.find({ userId: userId });
    if (!standingOrders || standingOrders.length === 0) {
      return res.status(404).json({ error: "standingOrders not found" });
    }

    res.status(200).json({
      status: "success",
      results: standingOrders.length,
      data: {
        standingOrders,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}
async function getAllDirectDebits(req, res) {
  try {
    const userId = req.params.userId.trim();

    const directDebits = await DirectDebit.find({ userId: userId });
    if (!directDebits || directDebits.length === 0) {
      return res.status(404).json({ error: "directDebits not found" });
    }

    res.status(200).json({
      status: "success",
      results: directDebits.length,
      data: {
        directDebits,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {
  getUser,
  getUserCards,
  getUserAccounts,
  getAccountBalance,
  getCardBalance,
  getAllBalances,
  getAllTransactions,
  getAllDirectDebits,
  getAllStandingOrders,
  getUserBalance,
};
