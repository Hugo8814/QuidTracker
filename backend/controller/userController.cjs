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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          accounts: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          cards: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          balances: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          balances: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          balances: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          balance: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          transactions: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          standingOrders: [],
        },
      });
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
      return res.status(200).json({
        status: "success",
        results: 0,
        data: {
          directDebits: [],
        },
      });
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

async function getOverviewData(req, res) {
  try {
    const userId = req.params.userId.trim();

    // Fetch all necessary data
    const user = await User.findOne({ userId: userId });
    const accounts = await Account.find({ userId: userId });
    const cards = await Card.find({ userId: userId });
    const balances = await Balance.find({ userId: userId });
    const transactions = await Transaction.find({ userId: userId }).sort({
      timestamp: -1, // Sort transactions by newest to oldest
    });
    const standingOrders = await StandingOrder.find({ userId: userId });
    const directDebits = await DirectDebit.find({ userId: userId });

    // Process cards to adjust balances for credit cards
    const processedCards = cards.map((card) => {
      if (card.card_type === "CREDIT") {
        // Find the balance associated with this card
        const associatedBalance = balances.find(
          (balance) => balance.accountId === card.account_id
        );

        // If a balance exists, make it negative
        if (associatedBalance) {
          associatedBalance.current = -Math.abs(associatedBalance.current);
        }
      }
      return card;
    });

    // Process transactions to reverse amounts for credit cards
    const processedTransactions = transactions.map((transaction) => {
      // Find the card associated with the transaction
      const associatedCard = cards.find(
        (card) => card.account_id === transaction.card_id
      );

      if (associatedCard && associatedCard.card_type === "CREDIT") {
        // Reverse transaction amounts for credit cards
        transaction.amount = -transaction.amount;
      }
      return transaction;
    });

    // Construct the overview data object
    const overviewData = {
      user,
      accounts: accounts || [],
      cards: processedCards || [],
      balances: balances || [],
      transactions: processedTransactions || [],
      standingOrders: standingOrders || [],
      directDebits: directDebits || [],
    };

    // Send the response
    res.status(200).json(overviewData);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
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
  getOverviewData,
};
