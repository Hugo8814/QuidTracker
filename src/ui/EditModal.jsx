/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  openDeleteModal,
  openEditBudgetModal,
  openEditPotModal,
} from "./modalSlice"; // Import the closeModal action

function EditModal({ item }) {
  const { isEditOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  function handleDispatch() {
    dispatch(openEditPotModal({ item }));

    dispatch(openEditBudgetModal({ item }));
  }

  if (!isEditOpen) return null;

  return (
    <div className="bg-[#ffffff] shadow-xl  right-6 w-content rounded-xl absolute text-3xl flex flex-col gap-6 items-start p-6 top-2 ">
      <button onClick={handleDispatch}>Edit</button>
      <button
        onClick={() => {
          dispatch(openDeleteModal(item));
        }}
        className=" text-red-500 "
      >
        Delete
      </button>
    </div>
  );
}

export default EditModal;
