import OverviewPage from "./Pages/Overview/OverviewPage";
import PotsPage from "./Pages/pots/PotsPage";

import RecurringBillsPage from "./Pages/recurringBills/RecurringPage";

import TransactionsPage from "./Pages/transactions/TransactionPage";

import LoginPage from "./Pages/login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignUp from "./Pages/login/SignUp";
import ConnectPage from "./Pages/connect/ConnectPage";
import SpendingPage from "./Pages/spending/SpendingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/connect",
    element: <ConnectPage />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "Overview",
        element: <OverviewPage />,
      },
      {
        path: "Transactions",
        element: <TransactionsPage />,
      },
      {
        path: "Spending",
        element: <SpendingPage />,
      },
      {
        path: "Pots",
        element: <PotsPage />,
      },
      {
        path: "RecurringBills",
        element: <RecurringBillsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
