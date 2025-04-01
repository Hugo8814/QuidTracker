import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setPots } from "../pots/potSlice";
// import { setBudget } from "../budgets/budgetSlice";
import { setTransactions } from "../transactions/transactionSlice";
// import { setRecurring } from "../recurringBills/recurringSlice";

// Create Async Thunk for Fetching Data
export const fetchOverviewData = createAsyncThunk(
  "overview/fetchOverviewData",
  async (_, { dispatch }) => {
    // const state = getState();
    // const token = selectAuthToken(state);
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!token) {
      throw new Error("Token is not available ");
    }

    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/overview`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseBody = await response.clone().text();

    if (!response.ok) {
      throw new Error("Network response was not ok: " + responseBody);
    }

    const data = JSON.parse(responseBody);
    console.log("Data received from API:", data);

    dispatch(setTransactions(data.transactions));
    // dispatch(setPots(data.pots));
    // dispatch(setBudget(data.budgets)); /// setting othert slices
    // dispatch(setRecurring(data.recurring));

    return data;
  }
);

// Create Slice
const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {
    resetOverviewState: () => {
      return { data: {}, status: "idle", error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOverviewData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchOverviewData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectOverviewData = (state) => state.overview.data;
export const selectOverviewStatus = (state) => state.overview.status;
export const selectOverviewError = (state) => state.overview.error;

export default overviewSlice.reducer;
export const { resetOverviewState } = overviewSlice.actions;
