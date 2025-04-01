import NavBtn from "./NavBtn";
import logo from "../imgs/logo.svg";
import transactions from "../imgs/transactions.svg";
import pieChart from "../imgs/pieChart.svg";
import receipt from "../imgs/receipt.svg";
import settings from "../imgs/setting.svg";
import home from "../imgs/home.svg";

function SideBar() {
  return (
    <div className="rounded-tr-3xl h-full  flex flex-col pl-12  pt-12 gap-4  bg-[#0055ff] text-white max-1300:px-4 max-1100:flex-row  max-1100:p-[1rem] max-1100:h-auto max-500:text-transparent max-1100:rounded-tr-none max-1100:rounded-b-3xl max-1100:sticky max-1100:top-0 z-50  ">
      {/* Logo Section */}
      <div className=" flex mt-4 mb-28  max-1100:hidden justify-center">
        <img src={logo} alt="logo" className="w-[2.4rem] " />
        <h1 className="text-[2.4rem] font-bold ">uid Tracker</h1>
      </div>

      {/* Navigation Links */}
      <NavBtn logo={home} to="Overview">
        Overview
      </NavBtn>

      <NavBtn logo={transactions}  to="Transactions">
        Transactions
      </NavBtn>

      <NavBtn logo={pieChart} to="Budgets">
        Budgets
      </NavBtn>

      <NavBtn logo={receipt} to="Pots">
        Recurring Bills
      </NavBtn>

      <NavBtn logo={settings} to="RecurringBills">
        Settings
      </NavBtn>
    </div>
  );
}

export default SideBar;
