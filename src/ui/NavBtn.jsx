/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function NavBtn({ logo, to, children }) {
  const isScreenSmall = useMediaQuery({ query: "(max-width: 768px)" });


  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center p-[1.6rem] max-1100:p-[1.2rem] text-gray-200 font-semibold text-[1.6rem] gap-4 no-underline max-1100:flex-col  ${
          isActive
            ? "bg-white text-gray-900  rounded-tr-[2rem] rounded-br-[2rem] border-l-[#277c78] border-l-[0.3rem] max-1100:rounded-bl-[2rem] max-1100:rounded-tr-[0rem] max-1100:border-t-[#277c78] max-1100:border-t-[0.4rem] max-1100:border-l-0"
            : ""
        }`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={logo}
            alt="Overview icon"
            className={`w-[1.9rem] ${
              isActive
                ? "filter invert-33 sepia-37 saturate-415 hue-rotate-126 brightness-92 contrast-86"
                : ""
            }`}
          />
          {isScreenSmall ? null : children}
        </>
      )}
    </NavLink>
  );
}

export default NavBtn;
