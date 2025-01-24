import {  Outlet,  } from "react-router-dom";

import SideBar from "./SideBar";



function AppLayout() {

 



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
