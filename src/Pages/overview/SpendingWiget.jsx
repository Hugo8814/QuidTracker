import SubTitle from "../../ui/SubTitle";
import SpendingChart from "../Spendings/SpendingChart";

import spendingPots from "./spendingPots";
import { formatCurrency } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { getSpendingData, getSpendingTotal } from "../Spendings/SpendingSlice";
import { useMemo } from "react";

function SpendingWiget() {
  const spendingData = useSelector(getSpendingData);
  const spendingTotal = useSelector(getSpendingTotal);
  const spentTotal = spendingData.reduce((total, item) => total + item.spent, 0);

  const chartData = useMemo(() => {
    return spendingData.map((item) => ({
      name: item.category, // Label for the pie slice
      value: Number(item.maximum), // Value for the pie slice
      theme: item.theme, // Color for the pie slice
    }));
  }, [spendingData]);

  return (
    <div className="flex bg-white rounded-md h-content w-full flex-col p-10 shadow-md ">
      <SubTitle to="/app/Spendings">Spendings</SubTitle>

      <div className="flex gap-6 justify-between max-500:flex-col">
        <div className=" mx-auto relative text-center  max-1200:scale-[0.9]">
          <div className="text-5xl font-bold absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            ${spentTotal}
            <p className="text-gray-500 text-lg">
              of {formatCurrency(SpendingTotal)} limit
            </p>
          </div>

          <SpendingChart data={chartData} />
        </div>

        <div className=" grid grid-cols-1 gird-rows-4 gap-4  max-500:grid-cols-[auto,auto,auto,auto] max-500:gap-0">
          <spendingPots data={SpendingData} Spending={true} />
        </div>
      </div>
    </div>
  );
}

export default spendingsWiget;
