// import dotenv from "dotenv";

import { useEffect } from "react";

// dotenv.config();

function ConnectPage() {
  // const CLIENT_ID = "sandbox-quidtracker-48cd14";
  // const REDIRECT_URI = "http://localhost:5173/connect"; // Update to match your frontend URL
  const AUTH_URL = `https://auth.truelayer-sandbox.com/?response_type=code&client_id=sandbox-quidtracker-48cd14&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:5173/connect&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all`;

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  console.log(authorizationCode);

  useEffect(() => {
    console.log("Authorization code in useEffect:", authorizationCode); // Add this line
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, [authorizationCode]);

  async function getAccessToken(authorizationCode) {
    console.log("Authorization code:", authorizationCode);
    if (!authorizationCode) {
      console.error("No authorization code found!");
      return;
    }
    try {
      const requestBody = new URLSearchParams({ code: authorizationCode });
      console.log("Request body:", requestBody.toString()); // Add this line
      const res = await fetch("http://localhost:3000/get-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
      });
      const data = await res.json();

      console.log("Access Token:", data.access_token);
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
    } catch (error) {
      console.error(`error fetching access token:`, error);
    }
  }

  return (
    <div className="shadow-xl flex justify-center items-center p-5 h-screen bg-[#919190] max-1100:flex-col max-1100:p-0">
      <a
        href={AUTH_URL}
        className="bg-blue-500 text-2xl hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline max-380:text-xl"
      >
        Connect Bank
      </a>
      <a
        href="/app"
        className="bg-blue-500 text-2xl hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline max-380:text-xl"
      >
        skip
      </a>
    </div>
  );
}

export default ConnectPage;
