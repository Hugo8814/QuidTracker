import DashboardPage from "./Pages/dashboard/DashboardPage";
import PotsPage from "./Pages/pots/PotsPage";

import RecurringBillsPage from "./Pages/recurringBills/RecurringPage";

import TransactionsPage from "./Pages/transactions/TransactionPage";
import BudgetsPage from "./Pages/budgets/BudgetsPage";
import LoginPage from "./Pages/login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignUp from "./Pages/login/SignUp";
import ConnectPage from "./Pages/connect/ConnectPage";

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
        path: "Dashboard",
        element: <DashboardPage />,
      },
      {
        path: "Transactions",
        element: <TransactionsPage />,
      },
      {
        path: "Budgets",
        element: <BudgetsPage />,
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
