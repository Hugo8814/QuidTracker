import { Outlet, useNavigation } from "react-router-dom";

import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverviewData,
  selectOverviewStatus,
} from "../Pages/overview/overviewSlice";
import Loader from "./Loader";
import { useEffect } from "react";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const status = useSelector(selectOverviewStatus);
  const error = useSelector((state) => state.overview.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOverviewData());
    }
  }, [status, dispatch]);

  // Show loading or error state as needed
  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-screen grid bg-[#F8F4F0] grid-cols-[18%,82%] max-1100:flex max-1100:flex-col justify-between">
      <SideBar />

      <main className="w-full h-full overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
