const fetch = require("node-fetch");
const { Card, Account } = require("../models/Account.cjs");
const Balance = require("../models/Balance.cjs");
const Transaction = require("../models/Transaction.cjs");
const DirectDebit = require("../models/DirectDebit.cjs");
const StandingOrder = require("../models/StandingOrder.cjs");
const User = require("../models/User.cjs");
const URL = "api.truelayer.com";
console.log(URL);

const CLIENT_ID = "quidtracker-48cd14";
const CLIENT_SECRET = "a8b948ed-a40b-4d72-a612-f84a75dab83a";

// Utility function to handle fetch requests
async function fetchData(url, accessToken) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching data from ${url}: ${response.status} ${response.statusText}`
      );
      if (response.status === 501) {
        // Return an empty array or null for unsupported endpoints
        return { results: [] };
      }
      throw new Error(
        `Error fetching data from ${url}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
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

    const cardsData = await fetchData(
      `https://${URL}/data/v1/cards`,
      accessToken
    );

    // Initialize empty arrays for accounts and cards
    const accounts = accountsData.results || [];
    const cards = cardsData.results || [];

    // Process accounts if they exist
    if (accounts.length > 0) {
      await processApiResponse(accountsData, Account, { userId }, userId);
    }

    // Process cards if they exist
    if (cards.length > 0) {
      await processApiResponse(cardsData, Card, { userId }, userId);
    }

    // Return the IDs even if empty
    return {
      accountIds: accounts.map((account) => account.account_id),
      cardIds: cards.map((card) => card.account_id),
    };
  } catch (error) {
    console.error("Error fetching account/card data:", error);
    // Return empty arrays if there's an error
    return { accountIds: [], cardIds: [] };
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
  console.log("Processing transactions for cardIds:", cardIds); // Add logging

  const cardTransactionPromises = cardIds.map(async (cardId) => {
    console.log(`Fetching transactions for card ${cardId}`); // Add logging
    try {
      const cardTransactionsData = await fetchData(
        `https://${URL}/data/v1/cards/${cardId}/transactions`,
        accessToken
      );
      console.log("Card transactions data:", cardTransactionsData); // Add logging

      if (
        cardTransactionsData.results &&
        cardTransactionsData.results.length > 0
      ) {
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
        console.log(`Successfully processed transactions for card ${cardId}`);
      } else {
        console.log(`No transactions found for card ${cardId}`);
      }
    } catch (error) {
      console.error(`Error processing transactions for card ${cardId}:`, error);
    }
  });

  await Promise.all(cardTransactionPromises);
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
async function refreshUserToken(userId, refreshToken) {
  try {
    console.log("Refreshing token for user:", refreshToken);
    const response = await fetch("https://auth.truelayer.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken, // Replace with the actual refresh token
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Log the full response body
      console.error("Error response from TrueLayer:", errorText);
      throw new Error(
        `Error refreshing token: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.access_token; // Return the refreshed token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
}

module.exports = {
  getUserInfo,
  getUserAccounts,
  getUserBalances,
  getUserTransactions,
  getUserDirectDebits,
  getUserStandingOders,
  refreshUserToken,
};
