const fetch = require("node-fetch");

async function getUserData(accessToken) {
  const response = await fetch(
    "https://api.truelayer-sandbox.com/data/v1/accounts",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching user data: ${JSON.stringify(data)}`);
  }

  return data;
}

module.exports = { getUserData };
