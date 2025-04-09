import { categorizeTransaction } from "../../categories/transactionCategories";
import { formatDate, formatCurrency } from "../../helpers";
import { useState } from "react";

const TransactionItem = ({ transaction }) => {
  const [imageError, setImageError] = useState(false);
  const result = categorizeTransaction(transaction);
  const { category, color, icon, logo } = result;

  const handleImageError = (e) => {
    console.error(
      `Failed to load image for ${transaction.meta.provider_merchant_name}`
    );
    setImageError(true);
  };

  return (
    <tr className="border-t">
      <td className="text-2xl font-normal flex items-center p-6 ">
        {logo && !imageError ? (
          <img
            src={logo}
            alt={transaction.meta.provider_merchant_name}
            className="w-14 h-14 rounded-xl object-contain "
            onError={handleImageError}
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        )}
        <div className="flex flex-col">
          <p className="pl-4 font-bold">
            {transaction.meta.provider_merchant_name}
          </p>
          <div className="hidden max-500:block pl-4 text-[1.4rem] text-gray-700">
            {category}
          </div>
        </div>
      </td>
      <td className="text-2xl font-normal text-gray-500 max-500:hidden">
        {category}
      </td>
      <td className="text-2xl font-normal text-gray-500 max-500:hidden">
        {formatDate(transaction.timestamp)}
      </td>
      <td className="text-2xl font-bold text-right">
        <div className="flex flex-col">
          <div
            style={{
              color: transaction.amount < 0 ? "red" : "green",
            }}
          >
            {formatCurrency(transaction.amount)}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
