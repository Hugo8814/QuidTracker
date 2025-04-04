import { Link } from "react-router-dom";
import iconCaretRight from "../../imgs/icon-caret-right.svg";

import AccountsWiget from "./AccountsWiget";
import TransactionWiget from "./TransactionWiget";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpendingWiget from "./SpendingWiget";

function OverviewPage() {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  console.log("Rendering OverviewPage");
  // useEffect(() => {
  //   if (token) {
  //     console.log("Token retrieved:", token);
  //   } else {
  //     console.log("No token found. Redirecting to login...");
  //     window.location.href = "/"; // Redirect if no token
  //   }
  // }, [token, dispatch]); // Add dispatch to dependencies

  // Ensure the token is available
  // if (!token) {
  //   return <div>Loading...</div>; // Show loading if token is not available
  // }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="w-full flex flex-col px-28 py-24 gap-12 overflow-auto max-1400:px-7 max-1200:scale-90 max-1200:px-0 max-1000:scale-100  max-1000:p-10 bg-[#F8F4F0]">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold text-[#0055ff]  max-500:text-5xl">
          Overview
        </h1>

        <Link
          to="/"
          className="bg-[#0055ff] shadow-md text-white text-2xl font-semibold p-3 rounded-xl max-500:text-2xl"
          onClick={handleLogout}
        >
          Log Out
        </Link>
      </div>

      <AccountsWiget />
      <div className="flex gap-4">
        <div className="w-[50%] h-full  rounded-xl bg-[white]">
          <div className="flex justify-between p-8 w-full ">
            <div className="text-3xl font-semibold ">Transactions</div>
            <Link
              to="/app/transactions"
              className="text-gray-500 text-2xl flex justify-center text-center"
            >
              <p className="pt-1 text-2xl">View All</p>
              <img
                src={iconCaretRight}
                alt="Right arrow"
                className="w-2 ml-4"
              />
            </Link>
          </div>
          <TransactionWiget />
        </div>
        <div className="w-[50%] h-[40rem] rounded-xl bg-white">
         
          <SpendingWiget />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
