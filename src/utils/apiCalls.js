export async function storeUserData() {
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