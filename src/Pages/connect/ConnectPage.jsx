import { useEffect } from "react";

console.log(import.meta.env.CLIENT_ID_SANDBOX);

function ConnectPage() {
   const AUTH_URL =
     "https://auth.truelayer.com/?response_type=code&client_id=quidtracker-48cd14&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:5173/connect&providers=uk-ob-all%20uk-oauth-all";

  //const AUTH_URL = `https://auth.truelayer-sandbox.com/?response_type=code&client_id=sandbox-quidtracker-48cd14&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:5173/connect&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all`; // this link works the other doesn't
  // const AUTH_URL =
  //   import.meta.env.MODE === "production"
  //     ? `https://auth.truelayer.com/?response_type=code&client_id=${import.meta.env.CLIENT_ID_PROD}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${import.meta.env.REDIRECT_URI}&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all`
  //     : `https://auth.truelayer-sandbox.com/?response_type=code&client_id=${import.meta.env.CLIENT_ID_SANDBOX}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${import.meta.env.REDIRECT_URI}&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all`;

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  console.log(authorizationCode);

  useEffect(() => {
    console.log("Authorization code in useEffect:", authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, [authorizationCode]);

  async function getAccessToken(authorizationCode) {
    console.log("Authorization code:", authorizationCode);

    try {
      const requestBody = new URLSearchParams({ code: authorizationCode });
      console.log("Request body:", requestBody.toString());
      const res = await fetch("http://localhost:3000/api/auth/get-token", {
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
        localStorage.setItem("refresh_token", data.refresh_token);

        await storeUserData();
      }
    } catch (error) {
      console.error(`error fetching access token:`, error);
    }
  }
  async function storeUserData() {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("Access Token:", accessToken);
    console.log("User ID:", userId);
    try {
      const response = await fetch(
        "http://localhost:3000/api/truelayer/store-user-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            access_token: accessToken,
            userId: userId,
            refresh_token: refreshToken,
          }),
        }
      );
      const data = await response.json();
      console.log("User data stored:", data);
    } catch (error) {
      console.error(error);
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
