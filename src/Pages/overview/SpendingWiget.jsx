import SpendingChart from "../spending/SpendingChart";

//import spendingPots from "./spendingPots";
import { formatCurrency } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { getSpendingData, getSpendingTotal } from "../spending/spendingSlice";
//
import { useMemo } from "react";
import { getTransactions } from "../transactions/transactionSlice";
import up from "../../imgs/up.svg";
import iconCaretRight from "../../imgs/icon-caret-right.svg";
import settingBar from "../../imgs/settingBar.svg";
import { Link } from "react-router-dom";

function SpendingWiget() {
  const spendingData = useSelector(getSpendingData);
  const data = useSelector(getTransactions);
  console.log(data);
  //   const spendingTotal = useSelector(getSpendingTotal);
  //   const spentTotal = spendingData.reduce(
  //     (total, item) => total + item.spent,
  //     0
  //   );

  //   const chartData = useMemo(() => {
  //     return spendingData.map((item) => ({
  //       name: item.transaction_category, // Label for the pie slice
  //       value: Number(item.maximum), // Value for the pie slice
  //       theme: item.theme, // Color for the pie slice
  //     }));
  //   }, [spendingData]);
  if (!spendingData) {
    return null;
  }
  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-10 bg-white rounded-md h-content w-full flex-col p-10 ">
      <div className="flex justify-between  w-full ">
        <div className="text-3xl font-semibold ">Spending Summary</div>
        <Link
          to="/app/transactions"
          className="text-gray-500 text-2xl flex justify-center text-center"
        >
          <p className="pt-1 text-2xl">View All</p>
          <img src={iconCaretRight} alt="Right arrow" className="w-2 ml-4" />
        </Link>
      </div>
      <div className="flex flex-col  justify-between max-500:flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <div className="text-2xl gap-2 font-semibold text-gray-500">
              March spending
            </div>
            <div className="text-3xl  font-semibold">£245.00</div>
          </div>
          <div className="flex   rounded-lg p-4 ">
            <div className=" flex gap-1 text-xl font-bold border-[#0055ff] border-2 p-2 rounded-2xl items-center">
              <div className="w-10">
                <img src={settingBar} alt="" />
              </div>
              <p className=" flex w-full text-[#0055ff] text-xl">Personalise</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center translate-y-[-20%]">
          <div className="flex  shadow-[0_4px_16px_4px_rgba(0,0,0,0.1)] rounded-lg p-4 ">
            <div className=" flex gap-2 text-2xl font-bold  text-[red] items-center">
              £{32}
              <div className="w-5">
                <img src={up} alt="" />
              </div>
              <p className=" flex w-full text-gray-500 text-xl">vs 24th feb</p>
            </div>
          </div>
        </div>

        <SpendingChart />

        {/* <div className=" grid grid-cols-1 gird-rows-4 gap-4  max-500:grid-cols-[auto,auto,auto,auto] max-500:gap-0">
         
        </div> */}
      </div>
    </div>
  );
}

export default SpendingWiget;
