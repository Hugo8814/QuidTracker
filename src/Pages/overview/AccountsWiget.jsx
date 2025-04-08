import { useEffect, useState } from "react";
import bankImg from "../../imgs/nationwide.svg";
import refresh from "../../imgs/refresh.svg";
import add from "../../imgs/add.svg";
import BankAcccount from "./BankAcccount";
import { Link } from "react-router-dom";
import { storeUserData } from "../../utils/apiCalls";

function AccountsWiget() {
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const refreshToken = localStorage.getItem("refresh_token");
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});

  // Function to refresh the token
  const handleRefresh = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/truelayer/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, refresh_token: refreshToken }), // Pass the userId in the body
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Token refreshed successfully:", data.token);
        localStorage.setItem("access_token", data.token); // Update the access token in localStorage

        // Call the function to store all user data
        await storeUserData();

        console.log("Token refreshed successfully!");
      } else {
        console.error("Error refreshing token:", data.error);
        alert("Failed to refresh token. Please try again.");
      }
    } catch (error) {
      console.error("Error making refresh token request:", error);
      alert("An error occurred while refreshing the token.");
    }
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [cardsResponse, accountsResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/users/cards/${userId}`, {
            method: "GET",
          }),
          fetch(`http://localhost:3000/api/users/accounts/${userId}`, {
            method: "GET",
          }),
        ]);

        const cardsData = await cardsResponse.json();
        const accountsData = await accountsResponse.json();

        setCards(cardsData.data.cards);
        setAccounts(accountsData.data.accounts);
      } catch (error) {
        console.error("Error fetching cards/accounts:", error);
      }
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    if (!cards.length && !accounts.length) return;

    async function fetchBalances() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/balances/${userId}`,
          {
            method: "GET",
          }
        );

        const balanceData = await response.json();

        const newBalances = {};
        balanceData.data.balances.forEach((balance) => {
          newBalances[balance.accountId] = balance;
        });

        setBalances(newBalances);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    }

    fetchBalances();
  }, [cards, accounts]);

  const totalAmount = [
    ...(Array.isArray(cards) ? cards : []),
    ...(Array.isArray(accounts) ? accounts : []),
  ].reduce((acc, current) => {
    const amount =
      (current?.account_id && balances[current.account_id]?.current) || 0
        ? balances[current.account_id].current || 0
        : 0;
    return acc + amount;
  }, 0);

  return (
    <div className="flex w-full h-full gap-8 max-800:flex-col">
      <div className="flex flex-col gap-4 bg-[#0055ff] text-white p-8 px-12 rounded-[2rem]">
        <h2 className="text-[2rem] font-semibold max-500:text-3xl">Networth</h2>
        <p className="text-[2.5rem] font-semibold">£{totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex overflow-x-auto">
        {[...cards, ...accounts].map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-white px-10 rounded-[2rem]"
          >
            <BankAcccount
              bankImg={item.provider.logo_uri}
              amount={balances[item.account_id]?.current || 0}
              accountType={item.card_type || item.account_type}
              bankName={item.provider.display_name}
            />
          </div>
        ))}
        <img
          src="https://truelayer-client-logos.s3-eu-west-1.amazonaws.com/banks/banks-icons/ob-capital-one-icon.svg"
          alt="Capital One"
          width={32}
          height={32}
        />
      </div>
      <div className="grid grid-cols-1 items-center">
        <div
          className="flex justify-center items-center gap-4 rounded-full w-fit h-fit p-1 bg-[#fff] text-white"
          onClick={handleRefresh} // Add the onClick event here
        >
          <div className="bg-white rounded-full w-[4rem] h-full">
            <img src={refresh} className="w-full h-full" alt="Refresh" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 rounded-full w-fit h-fit p-1 bg-[#fff] text-white">
          <Link to="/connect" className="bg-white rounded-full w-[4rem] h-full">
            <img src={add} className="w-full h-full" alt="Add" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountsWiget;
