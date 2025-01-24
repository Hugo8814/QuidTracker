import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { useState } from "react";
import downArrow from "../../assets/images/icon-caret-down.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchOverviewData } from "../Pages/overview/overviewSlice";

function AddNewTransaction() {
  const { isAddTransactionOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const maxLength = 20;
  const charactersLeft = maxLength - transactionName.length;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recurring, setRecurring] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state
  function handleRecurring(e) {
    const isChecked = e.target.checked; // Get the checkbox state
    setRecurring(isChecked); // Set the recurring state

    // Use isChecked to determine whether to negate the amount
    if (isChecked) {
      setAmount(-Math.abs(amount)); // Make sure the amount is negative if recurring
    } else {
      setAmount(Math.abs(amount)); // Make sure the amount is positive if not recurrin
    }
  }

  const categories = [
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
  ];

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1])); // Decode the token payload
    } catch (e) {
      console.error("Failed to decode token:", e);
      return null; // Return null if decoding fails
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("No token found. Please log in.");
      console.error("No token found");
      return;
    }

    const payload = decodeToken(token); // Decode the token to get the payload

    console.log("Decoded payload:", payload); // Debugging line

    // Ensure you're using userId here
    if (!payload || !payload.userId) {
      setErrorMessage("Invalid token. User ID not found.");
      console.error("Invalid token");
      return;
    }

    const transactionData = {
      id: Date.now(), // Use a unique ID or implement an ID generation strategy
      name: transactionName,
      amount: parseFloat(amount), // Ensure amount is a number
      category: selectedCategory,
      date: selectedDate,
      recurring: recurring,
      avatar: "../../assets/images/avatars/spark-electric-solutions.jpg",
      userId: payload.userId, // Ensure this is correctly set
    };

    console.log("Transaction data to send:", transactionData); // Debugging line

    // Proceed with sending transaction data to the API
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transaction: " + response.statusText);
      }

      const result = await response.json();
      console.log("Transaction submitted:", result);

      // Re-fetch overview data to update transactions
      dispatch(fetchOverviewData()); // Fetch updated overview data

      // Optionally, reset form or close modal here
      dispatch(closeModal());
    } catch (error) {
      setErrorMessage("Error submitting transaction: " + error.message);
      console.error("Error submitting transaction:", error);
    }
  };

  if (!isAddTransactionOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className="bg-white p-16 rounded-[2rem] w-[55rem] h-content flex flex-col gap-10 max-500:w-[45rem]">
        <div className=" flex justify-between items-center">
          <div className="text-5xl font-bold">Add New Transaction</div>
          <div onClick={() => dispatch(closeModal())} className="text-6xl ">
            &times;
          </div>
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}{" "}
        <div>
          <div className="text-gray-500 text-2xl  font-semibold">
            Transaction Name
          </div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900">
            <input
              onChange={(e) => setTransactionName(e.target.value)}
              type="text"
              maxLength={20}
              className="w-full outline-none border-none pr-37 pl-6 py-2 rounded-xl text-3xl"
              placeholder="e.g Rainy Days"
            />
          </div>
          <div className=" w-full text-right text-gray-500 text-xl">
            {charactersLeft} Letters Left
          </div>
        </div>
        <div className="">
          <div className="text-gray-500 text-2xl font-semibold  ">
            Transaction Date
          </div>
          <div className="flex items-center justify-between  rounded-2xl  relative bg-[#F6F6F6]">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full focus:outline-none bg-inherit border-none pr-96 pl-6 py-6 rounded-xl text-[1.7rem] max-500:pr-20"
              withPortal
              calendarClassName="scale-150"
            />
            <img className=" p-5" src={downArrow} alt="" />
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-2xl font-semibold ">Category</div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900 relative">
            <button
              onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              className="w-full text-gray-500 flex items-center outline-none border-none pr-37 pl-6 py-3 rounded-xl text-2xl"
            >
              {selectedCategory || "Select Category"}
              <img className="ml-auto" src={downArrow} alt="" />
            </button>

            {isDropdownOpen2 && (
              <div className="absolute left-0 top-[6rem] w-full bg-white text-2xl rounded-xl z-10 border-gray-500 border-[1px]">
                <div className="overflow-y-scroll h-[20rem]">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen2(false); // Close dropdown
                      }}
                      className="hover:bg-gray-200 pl-6 py-4 flex gap-5 cursor-pointer"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-2xl font-semibold ">Amount</div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900">
            <span className="text-gray-500 text-2xl ">$</span>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              value={amount}
              className="w-full outline-none border-none pr-37 pl-6 py-3 rounded-xl text-2xl"
              placeholder="e.g $2000"
            />
          </div>
        </div>
        <div className="text-gray-500 text-3xl font-semibold flex items-center">
          Recurring
          <input
            onChange={(e) => handleRecurring(e)}
            type="checkbox"
            className="ml-5 mt-2 "
          />
        </div>
        <button
          onClick={handleSubmit}
          className="flex justify-center items-center bg-black text-white text-3xl font-semibold p-6 rounded-xl"
        >
          Confirm Addition
        </button>
      </div>
    </div>
  );
}

export default AddNewTransaction;
