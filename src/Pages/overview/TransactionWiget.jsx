import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "../../utils/helpers";
import bankimg from "../../imgs/nationwide.svg";
import { useSelector } from "react-redux";
import { getTransactions } from "../transactions/transactionSlice";

function TransactionWiget() {
  const data = useSelector(getTransactions);

  return (
    <div className="flex  rounded-xl  flex-col p-8 h-full">
      {data
        .map((item, index) => (
          <div key={index} className="flex justify-between p-6">
            <div className="flex gap-4 items-center ">
              <img src={bankimg} alt="" className="w-16 rounded-full" />
              <p className="text-2xl font-bold">
                {item.meta.provider_merchant_name}
              </p>
            </div>
            <div className="space-y-2 flex flex-col items-end">
              <div
                className="text-2xl font-bold text-green-700"
                style={{
                  color: item && item.amount > 0 ? "green" : "red",
                }}
              >
                {formatCurrency(item && item.amount)}
              </div>
              <div className="text-gray-500 text-xl">
                {formatDate(item.timestamp)}
              </div>
            </div>
          </div>
        ))
        .slice(0, 7)}
    </div>
  );
}

export default TransactionWiget;
