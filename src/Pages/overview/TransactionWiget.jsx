import { useSelector } from "react-redux";
import { getTransactions } from "../transactions/transactionSlice";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { categorizeTransaction } from "../../utils/categories/transactionCategories";

function TransactionWiget() {
  const data = useSelector(getTransactions);

  return (
    <div className="flex rounded-xl flex-col p-8 h-full">
      {data
        .map((item, index) => {
          const result = categorizeTransaction(item);

          return (
            <div key={index} className="flex justify-between p-6">
              <div className="flex gap-4 items-center">
                {result.logo ? (
                  <>
                    <img
                      src={result.logo}
                      alt={item.meta.provider_merchant_name}
                      className="w-16 h-16 rounded-xl object-contain"
                      onError={(e) =>
                        handleImageError(e, item.meta.provider_merchant_name)
                      }
                    />
                    <div style={{ display: "none" }}>
                      {/* Fallback icon */}
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: result.color }}
                      >
                        <span className="text-3xl">{result.icon}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: result.color }}
                  >
                    <span className="text-3xl">{result.icon}</span>
                  </div>
                )}
                <p className="text-2xl font-bold">
                  {item.meta.provider_merchant_name}
                </p>
              </div>
              <div className="space-y-2 flex flex-col items-end">
                <div
                  className="text-2xl font-bold"
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
          );
        })
        .slice(0, 7)}
    </div>
  );
}

export default TransactionWiget;
