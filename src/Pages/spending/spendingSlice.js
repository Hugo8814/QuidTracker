import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getTransactions } from "../transactions/transactionSlice";

//   async (newspending) => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}api/spending`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(newspending),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to add pot");
//     }

//     return response.json(); // Return the added pot data
//   }
// );

// export const updatespending = createAsyncThunk(

//   "spending/updatespending",
//   async (updatedspending) => {
//     console.log(updatedspending);
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/api/spending/${updatedspending.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(updatedspending),
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Failed to update pot");
//     }

//     return response.json(); // Return the updated pot data
//   }
// );

const spendinglice = createSlice({
  name: "spending",
  initialState: {
    spending: [],
  },
  reducers: {
    setSpending(state, action) {
      state.spending = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Selector to get spending
const selectSpending = (state) => state.spending.spending || [];

// Memoized selector to calculate spent amounts for each spending item based on transactions from the transactionSlice
export const getSpendingData = createSelector(
  [selectSpending, getTransactions], // Use the getTransactions selector from the transactionSlice
  (spending, transactions) => {
    return spending.map((spendingItem) => {
      const updatedSpending = { ...spendingItem, spent: 0 };

      // Calculate total spent for the current spending
      transactions.forEach((transactionItem) => {
        if (transactionItem.category === updatedSpending.category) {
          updatedSpending.spent += Math.abs(transactionItem.amount);
        }
      });

      return updatedSpending;
    });
  }
);

// Selector to calculate the total maximum spending
export const getSpendingTotal = createSelector(
  [getSpendingData],
  (spendingData) => {
    return spendingData.reduce(
      (total, item) => total + Number(item.maximum),
      0
    );
  }
);

// Selector to calculate the total spent spending
export const getSpendingSpent = createSelector(
  [getSpendingData],
  (spendingData) => {
    return spendingData.reduce((total, item) => total + item.spent, 0);
  }
);

// Export the reducer actions
export const { setSpending, addBuget, deletespending } = spendinglice.actions;

// Export the spending reducer as default
export default spendinglice.reducer;
