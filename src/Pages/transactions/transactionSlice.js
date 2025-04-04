import { createSelector, createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    query: [],
    transactions: [],
    recurringTransactions: [], // Add a new state for recurring transactions
  },
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
    addRecurringTransaction(state, action) {
      state.recurringTransactions.push(action.payload); // Handle recurring transactions
    },
  },
});

export const { setTransactions, addTransaction, addRecurringTransaction } =
  transactionSlice.actions;

export const getTransactions = (state) => state.transactions.transactions || [];

export const getRecurringTransactions = (state) =>
  state.transactions.recurringTransactions; // Selector for recurring transactions

export const getTransactionsTotal = createSelector(
  [getTransactions],
  (transactions) =>
    transactions.reduce(
      (total, item) => total + (item.running_balance?.amount || 0),
      0
    )
);

export const getMonthlySpending = createSelector(
  [getTransactions],
  (transactions) => {
    const monthlySpending = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp);
      if (isNaN(date)) {
        console.warn("Invalid Date:", transaction.timestamp);
        return;
      }

      const month = date.toLocaleString("default", { month: "long" });

      if (!monthlySpending[month]) {
        monthlySpending[month] = {
          income: 0,
          expenses: 0,
          total: 0,
        };
      }

      if (transaction.running_balance && transaction.running_balance.amount) {
        if (transaction.running_balance.amount > 0) {
          monthlySpending[month].income += transaction.running_balance.amount;
        } else {
          monthlySpending[month].expenses += Math.abs(
            transaction.running_balance.amount
          );
        }
        monthlySpending[month].total =
          monthlySpending[month].income - monthlySpending[month].expenses;
      }
    });

    return monthlySpending;
  }
);

export const getTransactionIncome = createSelector(
  [getTransactions],
  (transactions) => {
    return transactions.reduce((total, item) => {
      if (item.amount > 0) {
        return total + item.amount;
      } else {
        return total;
      }
    }, 0);
  }
);

export const getTransactionExpense = createSelector(
  [getTransactions],
  (transactions) => {
    return transactions.reduce((total, item) => {
      if (item.amount < 0) {
        return total + item.amount;
      } else {
        return total;
      }
    }, 0);
  }
);
export default transactionSlice.reducer;
