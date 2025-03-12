const fetch = require("node-fetch");
const { Card, Account } = require("../models/Account.cjs");
const Balance = require("../models/Balance.cjs");

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
    if (balanceData.results && balanceData.results.length > 0) {
      const balance = new Balance({
        accountId,
        type: "account",
        currency: balanceData.results[0].currency,
        available: balanceData.results[0].available,
        current: balanceData.results[0].current,
        overdraft: balanceData.results[0].overdraft,
        updateTimestamp: balanceData.results[0].update_timestamp,
      });
      await balance.save();
    } else {
      console.log(`No balance data found for account ${accountId}`);
    }
  }

  for (const cardId of cardIds) {
    const balanceResponse = await fetch(
      `https://api.truelayer-sandbox.com/data/v1/cards/${cardId}/balance`,
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
        currency: balanceData.results[0].currency,
        available: balanceData.results[0].available,
        current: balanceData.results[0].current,
        overdraft: balanceData.results[0].overdraft,
        updateTimestamp: balanceData.results[0].update_timestamp,
        credit_limit: balanceData.results[0].credit_limit,
        last_statement_date: balanceData.results[0].last_statement_date,
        last_statement_balance: balanceData.results[0].last_statement_balance,
        payment_due: balanceData.results[0].payment_due,
        payment_due_date: balanceData.results[0].payment_due_date,
      });
      await balance.save();
    } else {
      console.log(`No balance data found for card ${cardId}`);
    }
  }
  return "Balances stored successfully";
}
module.exports = { getUserAccounts, getUserBalances };


async function getUserTransactions(accessToken) {
  try {

  }catch(error){
    console.error(error);
  }
