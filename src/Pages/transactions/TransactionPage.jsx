// import Header from "../../ui/Header";
// import { formatCurrency, formatDate } from "../../utils/helpers";
// import downArrow from "../../../assets/images/icon-caret-down.svg";
// // import iconCaretLeft from "../../../assets/images/icon-caret-left.svg";
// // import iconCaretRight from "../../../assets/images/icon-caret-right.svg";
import { useSelector } from "react-redux";
// import sort from "../../../assets/images/icon-sort-mobile.svg";

// import { getTransactions } from "./transactionSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
// import AddNewTransaction from "../../ui/AddNewTransaction";
// import filter from "../../../assets/images/icon-filter-mobile.svg";
// import { useMediaQuery } from "react-responsive";

function TransactionsPage() {
  // const transactions = useSelector(getTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isdropdownOpen, setIsDropdownOpen] = useState(false);
  const [isdropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState("All Transactions");

  // const isScreenSmall = useMediaQuery({ maxWidth: 700 });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const filteredTransactions = transactions.filter((transaction) =>
  //   transaction.name?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  function handleDropdown() {
    setIsDropdownOpen(!isdropdownOpen);
  }
  function handleDropdown2() {
    setIsDropdownOpen2(!isdropdownOpen2);
  }
  const handleSortBy = (sortOption) => {
    setSortBy(sortOption); // Update the selected sort value

    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleCategory = (categoryOption) => {
    setCategory(categoryOption); // Update the selected sort value

    setIsDropdownOpen2(false); // Close the dropdown after selection
  };
  // const categoryTransactions = [...filteredTransactions].filter((a) => {
  //   switch (category) {
  //     case "All Transactions":
  //       return a.category;
  //     case "Bills":
  //       return a.category === "Bills";
  //     case "Groceries":
  //       return a.category === "Groceries";
  //     case "Entertainment":
  //       return a.category === "Entertainment";
  //     case "Transportation":
  //       return a.category === "Transportation";
  //     case "Food":
  //       return a.category === "Food";
  //     case "Personal Care":
  //       return a.category === "Personal Care";
  //     case "Dining Out":
  //       return a.category === "Dining Out";
  //     case "Education":
  //       return a.category === "Education";
  //     case "Lifestyle":
  //       return a.category === "Lifestyle";
  //     case "Shopping":
  //       return a.category === "Shopping";
  //     case "General":
  //       return a.category === "General";

  //     default:
  //       return 0;
  //   }
  // });

  // const sortedTransactions = [...categoryTransactions].sort((a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);

  //   switch (sortBy) {
  //     case "Latest":
  //       return dateB - dateA;

  //     case "Oldest":
  //       return dateA - dateB;

  //     case "Highest":
  //       return b.amount - a.amount;

  //     case "Lowest":
  //       return a.amount - b.amount;
  //     case "A to Z":
  //       return a.name.localeCompare(b.name); // Sort by name A to Z
  //     case "Z to A":
  //       return b.name.localeCompare(a.name); // Sort by name Z to A

  //     default:
  //       return 0;
  //   }
  // });
  // Now, calculate totalPages after sortedTransactions is initialized
  // const totalPages = Math.ceil(sortedTransactions.length / perPage);

  ////////////////////////////////////////////

  function handleNextPage() {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  }

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  ///////////////////////////////////////////

  return (
    <div className="w-full  h-full flex flex-col px-28 py-28 gap-12 overflow-auto max-900:px-10 max-1500:pb-10 max-1000:pt-10  bg-[#F8F4F0]   ">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold text-[#0055ff]  max-500:text-5xl">
          Transactions
        </h1>

        <Link
          to="/"
          className="bg-[#0055ff] shadow-md text-white text-2xl font-semibold p-3 rounded-xl max-500:text-2xl"
          //onClick={handleLogout}
        >
          Log Out
        </Link>
      </div>
      {/* <AddNewTransaction /> */}
      <div className="flex bg-white rounded-xl   p-14 flex-col shadow-md">
        <div className="flex pb-10 max-700:items-center">
          <div className="flex mr-auto">
            <input
              type="text"
              placeholder="Search transactions"
              className="border-gray-500 border-[1px] pr-72 pl-6 py-4 rounded-xl text-2xl max-1400:pr-16 max-1200:pr-0 max-800:mx-3"
              onChange={(e) => handleSearchChange(e)}
            />
          </div>

          <div className="flex gap-12">
            <div className="flex gap-6 items-center      ">
              <p
                type="dropdown"
                className="text-2xl text-gray-600  max-700:hidden"
              >
                sort by
              </p>
              <div className="h-full relative space-y-3 text-2xl">
                {/* {isScreenSmall && (
                <button onClick={() => handleDropdown()}>
                  <img src={filter} alt="" />
                </button>
                )} */}
                <div className="h-full  max-700:hidden">
                  <button
                    onClick={() => handleDropdown()}
                    className="border-gray-500 border-[1px] px-6 rounded-xl h-full flex items-center gap-24  justify-between font-semibold max-1200:gap-7"
                  >
                    {/* {sortBy} */}
                    {/* <img src={downArrow} alt="" /> */}
                  </button>
                </div>
                {isdropdownOpen && (
                  <div className="absolute w-full bg-white rounded-xl   z-10 border-gray-500 border-[1px] max-700:w-[10rem] max-700:right-0 ">
                    <div
                      onClick={() => handleSortBy("Latest")}
                      className="hover:bg-gray-200 pl-6 py-4 "
                    >
                      Latest
                    </div>
                    <div
                      onClick={() => handleSortBy("Oldest")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Oldest
                    </div>
                    <div
                      onClick={() => handleSortBy("A to Z")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="A to Z"
                    >
                      A to Z
                    </div>
                    <div
                      onClick={() => handleSortBy("Z to A")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Z to A"
                    >
                      Z to A
                    </div>
                    <div
                      onClick={() => handleSortBy("Highest")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Highest"
                    >
                      Highest
                    </div>
                    <div
                      onClick={() => handleSortBy("Lowest")}
                      className="hover:bg-gray-200 pl-6 py-4"
                      value="Lowest"
                    >
                      Lowest
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p className="text-2xl text-gray-600  max-700:hidden">Category</p>

              <div className="h-full relative space-y-3 text-2xl">
                {/* {isScreenSmall && (
                  <button onClick={() => handleDropdown2()}>
                    <img src={sort} alt="sort icone" />
                  </button>
                )} */}
                <button
                  onClick={() => handleDropdown2()}
                  className="border-gray-500 border-[1px] px-6 rounded-xl h-full flex items-center gap-24  justify-between font-semibold max-1200:gap-7  max-700:hidden"
                >
                  {category}
                  {/* <img src={downArrow} alt="" /> */}
                </button>
                {isdropdownOpen2 && (
                  <div className="absolute w-full bg-white rounded-xl   z-10 border-gray-500 border-[1px] max-700:w-[15rem] max-700:right-0 ">
                    <div
                      onClick={() => handleCategory("All Transactions")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      All Transactions
                    </div>
                    <div
                      onClick={() => handleCategory("Entertainment")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Entertainment
                    </div>
                    <div
                      onClick={() => handleCategory("Bills")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Bills
                    </div>
                    <div
                      onClick={() => handleCategory("Groceries")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Groceries
                    </div>
                    <div
                      onClick={() => handleCategory("Dining Out")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Dining Out
                    </div>
                    <div
                      onClick={() => handleCategory("Transportation")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Transportation
                    </div>

                    <div
                      onClick={() => handleCategory("Personal Care")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Personal Care
                    </div>
                    <div
                      onClick={() => handleCategory("Education")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Education
                    </div>
                    <div
                      onClick={() => handleCategory("Lifestyle")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Lifestyle
                    </div>
                    <div
                      onClick={() => handleCategory("Shopping")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      Shopping
                    </div>
                    <div
                      onClick={() => handleCategory("General")}
                      className="hover:bg-gray-200 pl-6 py-4"
                    >
                      General
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead className="max-700:hidden">
            <tr>
              <th className="text-2xl font-normal text-gray-500 text-left p-6">
                Recipent / Sender
              </th>
              <th className="text-2xl font-normal text-gray-500 text-left">
                Category
              </th>
              <th className="text-2xl font-normal text-gray-500 text-left">
                Transaction Date
              </th>
              <th className="text-2xl font-normal text-gray-500 text-right">
                Amount
              </th>
            </tr>
          </thead>

          {/* <tbody>
            {sortedTransactions &&
              sortedTransactions.slice(start, end).map((item, index) => (
                <tr key={index} className="border-t ">
                  <td className="text-2xl font-normal flex items-center p-6">
                    <img
                      src={item.avatar}
                      className="w-14 rounded-full"
                      alt="icon"
                    />
                    <div className="flex flex-col">
                      <p className="pl-4 font-bold ">{item.name}</p>
                      <div className="hidden max-500:block pl-4 text-[1.4rem] text-gray-700">
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="text-2xl font-normal text-gray-500 max-500:hidden">
                    {item.category}
                  </td>
                  <td className="text-2xl font-normal text-gray-500 max-500:hidden">
                    {formatDate(item.date)}
                  </td>
                  <td className="text-2xl  font-bold text-right">
                    <div className="flex flex-col">
                      <div style={{ color: item.amount < 0 ? "red" : "green" }}>
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="hidden max-500:block font-normal">
                        {formatDate(item.date)}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody> */}
        </table>

        {/* <div className="flex justify-between mt-14 items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border-gray-500 border-[1px] py-4  px-6 rounded-xl h-full flex items-center gap-6 text-2xl"
          >
             <img src={iconCaretLeft} alt="" /> 
            Prev
          </button>
          <div className="flex justify-center items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                style={{
                  backgroundColor:
                    currentPage === index + 1 ? "black" : "white",
                  color: currentPage === index + 1 ? "white" : "black",
                }}
                className="border-gray-500 border-[1px] py-3 px-5 rounded-xl h-[80%] mx-2 text-2xl flex items-center"
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            // disabled={currentPage === totalPages}
            className="border-gray-500 border-[1px] py-4 px-6 rounded-xl h-full flex items-center gap-6 text-2xl"
          >
            Next
             <img src={iconCaretRight} alt="" /> 
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default TransactionsPage;


