/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";

import {
  openAddPotModal,
  openAddBudgetModal,
  openAddTransaction,
} from "./modalSlice";

function Header({ title, btn, text, budget, pot, transaction }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center ">
      <h1 className="text-6xl font-bold  max-500:text-5xl">{title}</h1>
      {btn && (
        <button
          onClick={() => {
            if (budget) {
              dispatch(openAddBudgetModal());
            } else if (pot) {
              dispatch(openAddPotModal());
            } else if (transaction) {
              dispatch(openAddTransaction());
            }
          }}
          className="bg-black shadow-md text-white text-3xl font-semibold p-6 rounded-xl max-500:text-2xl"
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default Header;
