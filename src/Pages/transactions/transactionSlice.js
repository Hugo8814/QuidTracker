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

export const getTransactions = (state) => state.transactions.transactions;
export const getRecurringTransactions = (state) =>
  state.transactions.recurringTransactions; // Selector for recurring transactions

export const getTransactionsTotal = createSelector(
  [getTransactions],
  (transactions) => {
    return transactions.reduce((total, item) => total + item.amount, 0);
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
