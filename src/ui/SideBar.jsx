import NavBtn from "./NavBtn";

function SideBar() {
  return (
    <div className="rounded-tr-3xl h-full flex flex-col p-12 gap-4 bg-gray-900 text-white max-1300:px-4 max-1100:flex-row  max-1100:p-[1rem] max-1100:h-auto max-500:text-transparent max-1100:rounded-tr-none max-1100:rounded-b-3xl max-1100:sticky max-1100:top-0 z-50  ">
      {/* Logo Section */}
      <div className="mt-4 mb-28  max-1100:hidden">
        <img alt="logo" />
      </div>

      {/* Navigation Links */}
      <NavBtn to="Dashboard">Dashboard</NavBtn>

      <NavBtn to="Transactions">Transactions</NavBtn>

      <NavBtn to="Budgets">Budgets</NavBtn>

      <NavBtn to="Pots">Pots</NavBtn>

      <NavBtn to="RecurringBills">Recurring Bills</NavBtn>
    </div>
  );
}

export default SideBar;
