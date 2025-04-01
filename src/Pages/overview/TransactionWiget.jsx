import { useEffect, useState } from "react";
import { formatDate } from "../../utils/helpers";
import bankimg from "../../imgs/nationwide.svg";

function TransactionWiget() {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("user_id");
  async function fetchTransactions() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/transactions/${userId}`
      );
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTransactions();
  }, []);

  if (!transactions || !transactions.data || !transactions.data.transactions) {
    return <div>Loading...</div>;
  }
  console.log(transactions.data.transactions);

  return (
    <div className="flex  rounded-xl  flex-col p-8 ">
      {transactions.data.transactions
        .map((item, index) => (
          <div key={index} className="flex justify-between p-6">
            <div className="flex gap-4 items-center ">
              <img src={bankimg} alt="" className="w-16 rounded-full" />
              <p className="text-2xl font-bold">{item.description}</p>
            </div>
            <div className="space-y-2 flex flex-col items-end">
              <div
                className="text-2xl font-bold text-green-700"
                style={{
                  color:
                    item.running_balance && item.running_balance.amount > 0
                      ? "green"
                      : "red",
                }}
              >
                {item.running_balance && item.running_balance.amount}
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
