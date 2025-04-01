import { configureStore } from "@reduxjs/toolkit";
import overviewReducer from "./Pages/overview/overviewSlice";
import transactionReducer from "./Pages/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    overview: overviewReducer,
    transactions: transactionReducer,
  },
});

export default store;
