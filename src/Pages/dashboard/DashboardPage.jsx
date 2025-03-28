import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bankImg from "../../imgs/nationwide.svg";
import refresh from "../../imgs/refresh.svg";
import add from "../../imgs/add.svg";

function DashboardPage() {
  const accessToken = localStorage.getItem("access_token");
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(null);
  console.log("Access token:", accessToken);
  async function storeUserData() {
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
  // <button onClick={() => storeUserData()}>store user data</button>
  // }, []);
  return (
    <div className="w-full flex flex-col px-28 py-24 gap-12 overflow-auto max-1400:px-7 max-1200:scale-90 max-1200:px-0 max-1000:scale-100  max-1000:p-10 bg-[#F8F4F0]">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold text-[#0055ff]  max-500:text-5xl">
          Overview
        </h1>

        <Link
          to="/"
          className="bg-[#0055ff] shadow-md text-white text-2xl font-semibold p-3 rounded-xl max-500:text-2xl"
          //onClick={handleLogout}
        >
          Log Out
        </Link>
      </div>

      <div className=" flex w-full h-full gap-8 max-800:flex-col">
        <div className="flex flex-col gap-4   bg-[#0055ff] text-white p-10 px-16 rounded-[2rem]">
          <h2 className="text-[2rem] font-semibold  max-500:text-3xl">
            Networth
          </h2>
          <p className="text-[2.5rem] font-semibold ">£3405</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
          <div className="flex justify-center items-center  gap-6   bg-[#fff] text-white p-6  rounded-[2rem]">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img src={bankImg} className="w-full h-full" alt="bank logo" />
            </div>
            <p className="text-[2.5rem] text-[#0055ff] font-semibold ">£586</p>
          </div>
        </div>

        <div className="grid grid-cols-1  items-center">
          <div className="flex justify-center items-center  gap-4 rounded-full w-fit h-fit p-1  bg-[#fff] text-white   ">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img
                src={refresh}
                className="w-full h-full fill-[#0055ff]"
                alt="bank logo"
              />
            </div>
          </div>
          <div className="flex justify-center items-center  gap-4 rounded-full w-fit h-fit p-1  bg-[#fff] text-white   ">
            <div className="bg-white  rounded-full w-[4rem] h-full">
              <img
                src={add}
                className="w-full h-full fill-[#0055ff]"
                alt="bank logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
