/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function NavBtn({ logo, to, children }) {
  const isScreenSmall = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center rounded-l-xl p-[1.6rem] max-1100:p-[1.2rem] text-gray-200 font-semibold text-[1.6rem] gap-4 no-underline max-1100:flex-col  ${
          isActive ? "bg-[#F8F4F0] text-gray-900  " : ""
        }`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={logo}
            alt="Overview icon"
            className={`w-[1.9rem] ${isActive ? "filter invert" : ""}`}
          />
          {isScreenSmall ? null : children}
        </>
      )}
    </NavLink>
  );
}

export default NavBtn;


