const fetch = require("node-fetch");
const { Card, Account } = require("../models/Account.cjs");

async function getUserAccounts(accessToken) {
  try {
    const accountsResponse = await fetch(
      "https://api.truelayer-sandbox.com/data/v1/accounts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

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

    const cardsResponse = await fetch(
      "https://api.truelayer-sandbox.com/data/v1/cards",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

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

   
    console.log("worked");

    return accountsData.results.map((account) => account.account_id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserBalances(accountIds, accessToken) {
  const balances = [];
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
    balances.push(balanceData);
  }
  return balances;
}

module.exports = { getUserAccounts, getUserBalances };
