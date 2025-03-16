const fetch = require("node-fetch");
const { Card, Account } = require("../models/Account.cjs");
const Balance = require("../models/Balance.cjs");
const Transaction = require("../models/Transaction.cjs");
const mongoose = require("mongoose");
const DirectDebit = require("../models/DirectDebit.cjs");

const URL = "api.truelayer-sandbox.com";
async function getUserAccounts(accessToken) {
  try {
    const accountsResponse = await fetch(`https://${URL}/data/v1/accounts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!accountsResponse.ok) {
      throw new Error(
        `Error fetching accounts: ${accountsResponse.status} ${accountsResponse.statusText}`
      );
    }

    const accountsData = await accountsResponse.json();
    const accounts = accountsData.results;

    accounts.forEach((account) => {
      account.update_timestamp = new Date(account.update_timestamp);
    });

    accounts.forEach((account) => {
      const accountDoc = new Account(account);
      accountDoc.save();
    });

    const cardsResponse = await fetch(`https://${URL}/data/v1/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!cardsResponse.ok) {
      throw new Error(
        `Error fetching cards: ${cardsResponse.status} ${cardsResponse.statusText}`
      );
    }

    const cardsData = await cardsResponse.json();
    const cards = cardsData.results;

    cards.forEach((card) => {
      const cardDoc = new Card(card);
      cardDoc.save();
    });

    const accountIds = {
      accountIds: accountsData.results.map((account) => account.account_id),
      cardIds: cardsData.results.map((card) => card.account_id),
    };

    return accountIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserBalances(Ids, accessToken) {
  const { accountIds, cardIds } = Ids;

  for (const accountId of accountIds) {
    const balanceResponse = await fetch(
      `https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/balance`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const balanceData = await balanceResponse.json();
    console.log(balanceData);
    if (balanceData.results && balanceData.results.length > 0) {
      const balance = new Balance({
        accountId,
        type: "account",
        ...balanceData.results[0]
      });
      await balance.save();
    } else {
      console.log(`No balance data found for account ${accountId}`);
    }
  }

  for (const cardId of cardIds) {
    const balanceResponse = await fetch(
      `https://${URL}/data/v1/cards/${cardId}/balance`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const balanceData = await balanceResponse.json();
    if (balanceData.results && balanceData.results.length > 0) {
      const balance = new Balance({
        accountId: cardId,
        type: "card",
        ...balanceData.results
      });
      await balance.save();
    } else {
      console.log(`No balance data found for card ${cardId}`);
    }
  }
  return "Balances stored successfully";
}

async function getUserTransactions(Ids, accessToken) {
  const { accountIds, cardIds } = Ids;
  try {
    for (const accountId of accountIds) {
      const accountTransactionsResponse = await fetch(
        "https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/transactions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const accountTransactionsData = await accountTransactionsResponse.json();
      if (
        accountTransactionsData.results &&
        accountTransactionsData.results.length > 0
      ) {
        accountTransactionsData.results.forEach((transaction) => {
          const transactionDoc = new Transaction({
            // userID: transaction.user_id, // assuming user_id is the correct field
            ...transaction,

            account_id: accountId.toString(), // assuming account_id is the correct field
            pending: false,
          });
          transactionDoc.save();
        });
      }
    }

    for (const cardId of cardIds) {
      const cardTransactionsResponse = await fetch(
        `https://${URL}/data/v1/cards/${cardId}/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const cardTransactionsData = await cardTransactionsResponse.json();
      if (
        cardTransactionsData.results &&
        cardTransactionsData.results.length > 0
      ) {
        cardTransactionsData.results.forEach((transaction) => {
          const transactionDoc = new Transaction({
            ...transaction,
            card_id: cardId.toString(), // Convert cardId to ObjectId
            pending: false,
          });

          transactionDoc.save();
        });
      }
    }
    //////////// Pending transactions
    for (const accountId of accountIds) {
      const pendingAccountTransactionsResponse = await fetch(
        `https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/transactions/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const pendingAccountTransactionsData =
        await pendingAccountTransactionsResponse.json();
      if (
        pendingAccountTransactionsData.results &&
        pendingAccountTransactionsData.results.length > 0
      ) {
        pendingAccountTransactionsData.results.forEach((transaction) => {
          const transactionDoc = new Transaction({
            ...transaction,
            account_id: accountId.toString(),
            pending: true,
          });
          transactionDoc.save();
        });
      }
    }

    for (const cardId of cardIds) {
      const pendingCardTransactionsResponse = await fetch(
        `https://${URL}/data/v1/cards/${cardId}/transactions/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const pendingCardTransactionsData =
        await pendingCardTransactionsResponse.json();
      console.log(pendingCardTransactionsData);
      if (
        pendingCardTransactionsData.results &&
        pendingCardTransactionsData.results.length > 0
      ) {
        pendingCardTransactionsData.results.forEach((transaction) => {
          const transactionDoc = new Transaction({
            ...transaction,
            card_id: cardId.toString(),
            pending: true,
          });
          transactionDoc.save();
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserDirectDebits(Ids, accessToken) {
  const { accountIds, cardIds } = Ids;
  try {
    for (const accountId of accountIds) {
      const directDebitResponse = await fetch(
        `https://${URL}/data/v1/accounts/${accountId}/direct_debits`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const directDebitData = await directDebitResponse.json();
      const directDebits = directDebitData.results;
      if (directDebits && directDebits.length > 0) {
        directDebits.forEach((directDebit) => {
          const directDebitDoc = new DirectDebit({
            ...directDebit,
            account_id: accountId,
          });
          directDebitDoc.save();
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
};
