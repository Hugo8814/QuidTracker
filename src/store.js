import { configureStore } from "@reduxjs/toolkit";
import overviewReducer from "./Pages/overview/overviewSlice";
import transactionReducer from "./Pages/transactions/transactionSlice";
import spendingReducer from "./Pages/spending/spendingSlice";

const store = configureStore({
  reducer: {
    overview: overviewReducer,
    transactions: transactionReducer,
    spending: spendingReducer,
  },
});

export default store;
