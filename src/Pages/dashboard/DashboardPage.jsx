import { useEffect, useState } from "react";

function DashboardPage() {
  const accessToken = localStorage.getItem("access_token");
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(null);
  console.log("Access token:", accessToken);
  async function getUserData() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/truelayer/get-user-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            access_token: accessToken,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  //   getUserData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div>
      <button onClick={() => getUserData()}>get user data</button>
      {userData ? (
        <div>
          <h1>User Data</h1>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DashboardPage;
