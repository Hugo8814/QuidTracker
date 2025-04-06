const fetch = require("node-fetch");
const { Card, Account } = require("../models/Account.cjs");
const Balance = require("../models/Balance.cjs");
const Transaction = require("../models/Transaction.cjs");
const DirectDebit = require("../models/DirectDebit.cjs");
const StandingOrder = require("../models/StandingOrder.cjs");
const User = require("../models/User.cjs");
const URL = "api.truelayer.com";
console.log(URL);

// Utility function to handle fetch requests
async function fetchData(url, accessToken) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${url}: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}

// Function to process and save data from API response
async function processApiResponse(data, model, additionalFields = {}, userId) {
  if (data.results && data.results.length > 0) {
    try {
      await Promise.all(
        data.results.map(async (item) => {
          const doc = new model({
            userId,
            ...item,
            ...additionalFields,
          });
          await doc.save();
        })
      );
    } catch (error) {
      console.error("Error saving data to database:", error);
    }
  } else {
    console.log("No data found for the requested resource");
  }
}
// Fetch user accounts and cards

async function getUserInfo(accessToken, userId) {
  try {
    const userInfo = await fetchData(
      `https://${URL}/data/v1/info`,
      accessToken
    );
    await processApiResponse(userInfo, User, { userId }, userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return "user info stored successfully";
}
async function getUserAccounts(accessToken, userId) {
  try {
    const accountsData = await fetchData(
      `https://${URL}/data/v1/accounts`,
      accessToken
    );
    if (!accountsData.results || accountsData.results.length === 0) {
      console.log("No account data found for this user");
      return "No account data found";
    }
    accountsData.results.forEach((account) => {
      account.update_timestamp = new Date(account.update_timestamp);
    });
    await processApiResponse(accountsData, Account, { userId }, userId);

    const cardsData = await fetchData(
      `https://${URL}/data/v1/cards`,
      accessToken
    );
    if (!cardsData.results || cardsData.results.length === 0) {
      console.log("No card data found for this user");
      return "No card data found";
    }
    await processApiResponse(cardsData, Card, { userId }, userId);

    const accountIds = {
      accountIds: accountsData.results.map((account) => account.account_id),
      cardIds: cardsData.results.map((card) => card.account_id),
    };

    return accountIds;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("No account data found for this user");
      return "No account data found";
    } else {
      console.error("Error fetching account data:", error);
      throw error;
    }
  }
}
// Fetch and save user balances
async function getUserBalances(Ids, accessToken, userId) {
  const { accountIds, cardIds } = Ids;

  const accountBalancePromises = accountIds.map(async (accountId) => {
    const balanceData = await fetchData(
      `https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/balance`,
      accessToken
    );
    await processApiResponse(
      balanceData,
      Balance,
      {
        accountId,
        type: "account",
        userId,
      },
      userId
    );
  });

  const cardBalancePromises = cardIds.map(async (cardId) => {
    const balanceData = await fetchData(
      `https://${URL}/data/v1/cards/${cardId}/balance`,
      accessToken
    );
    await processApiResponse(
      balanceData,
      Balance,
      {
        accountId: cardId,
        type: "card",
        userId,
      },
      userId
    );
  });

  await Promise.all([...accountBalancePromises, ...cardBalancePromises]);

  return "Balances stored successfully";
}

// Fetch and save user transactions
async function getUserTransactions(Ids, accessToken, userId) {
  const { accountIds, cardIds } = Ids;

  const accountTransactionPromises = accountIds.map(async (accountId) => {
    const accountTransactionsData = await fetchData(
      `https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/transactions`,
      accessToken
    );
    const limitedTransactions = accountTransactionsData.results.slice(0, 200); // Limit to 200 transactions
    await processApiResponse(
      { results: limitedTransactions },
      Transaction,
      {
        account_id: accountId.toString(),
        pending: false,
        userId,
      },
      userId
    );
  });
  const cardTransactionPromises = cardIds.map(async (cardId) => {
    const cardTransactionsData = await fetchData(
      `https://${URL}/data/v1/cards/${cardId}/transactions`,
      accessToken
    );
    await processApiResponse(
      cardTransactionsData,
      Transaction,
      {
        card_id: cardId.toString(),
        pending: false,
        userId,
      },
      userId
    );
  });

  const pendingAccountTransactionPromises = accountIds.map(
    async (accountId) => {
      const pendingAccountTransactionsData = await fetchData(
        `https://api.truelayer-sandbox.com/data/v1/accounts/${accountId}/transactions/pending`,
        accessToken
      );
      await processApiResponse(
        pendingAccountTransactionsData,
        Transaction,
        {
          account_id: accountId.toString(),
          pending: true,
          userId,
        },
        userId
      );
    }
  );

  const pendingCardTransactionPromises = cardIds.map(async (cardId) => {
    const pendingCardTransactionsData = await fetchData(
      `https://${URL}/data/v1/cards/${cardId}/transactions/pending`,
      accessToken
    );
    await processApiResponse(
      pendingCardTransactionsData,
      Transaction,
      {
        card_id: cardId.toString(),
        pending: true,
        userId,
      },
      userId
    );
  });

  await Promise.all([
    ...accountTransactionPromises,
    ...cardTransactionPromises,
    ...pendingAccountTransactionPromises,
    ...pendingCardTransactionPromises,
  ]);

  return "Transactions stored successfully";
}

// Fetch and save user direct debits
async function getUserDirectDebits(Ids, accessToken, userId) {
  const { accountIds } = Ids;

  const directDebitPromises = accountIds.map(async (accountId) => {
    const directDebitData = await fetchData(
      `https://${URL}/data/v1/accounts/${accountId}/direct_debits`,
      accessToken
    );
    await processApiResponse(
      directDebitData,
      DirectDebit,
      {
        account_id: accountId,
        userId,
      },
      userId
    );
  });

  await Promise.all(directDebitPromises);

  return "Direct Debits stored successfully";
}

async function getUserStandingOders(Ids, accessToken, userId) {
  const { accountIds } = Ids;

  const standingOrderPromises = accountIds.map(async (accountId) => {
    const standingOrderData = await fetchData(
      `https://${URL}/data/v1/accounts/${accountId}/standing_orders`,
      accessToken
    );
    await processApiResponse(
      standingOrderData,
      StandingOrder,
      {
        account_id: accountId,
        userId,
      },
      userId
    );
  });

  await Promise.all(standingOrderPromises);

  return "Standing Orders stored successfully";
}

module.exports = {
  getUserInfo,
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
  getUserStandingOders,
};
