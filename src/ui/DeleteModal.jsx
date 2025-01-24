/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { fetchOverviewData } from "../Pages/overview/overviewSlice";

function DeleteModal({ item, budget, pot }) {
  const { isDeleteOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  // Close modal if it's not open
  if (!isDeleteOpen) return null;

  // Get the ID of the item to be deleted
  const id = item._id;
  console.log("ID:", id);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      let url = "";

      // Determine which API endpoint to use based on pot or budget
      if (pot) {
        url = `${import.meta.env.VITE_API_URL}/api/pots/${id}`;
      } else if (budget) {
        url = `${import.meta.env.VITE_API_URL}/api/budgets/${id}`;
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete ${pot ? "pot" : "budget"}: ${response.statusText}`
        );
      }

      console.log(`${pot ? "Pot" : "Budget"} deleted successfully`);

      // Fetch updated overview data after successful deletion
      dispatch(fetchOverviewData());

      // Close the modal after successful deletion
      dispatch(closeModal());
    } catch (error) {
      console.error(`Error deleting ${pot ? "pot" : "budget"}:`, error);
      alert(
        `Failed to delete the ${pot ? "pot" : "budget"}. Please try again.`
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-16 rounded-[2rem] w-[55rem] h-content flex flex-col gap-14 max-500:w-[35rem] max-500:p-10">
        <div className="flex justify-between items-center">
          <div className="text-5xl font-bold max-500:text-4xl">
            Delete &quot;{item.name || item.category}&quot;
          </div>
          <div
            onClick={() => dispatch(closeModal())}
            className="text-6xl cursor-pointer"
          >
            &times;
          </div>
        </div>
        <div className="text-2xl">
          Are you sure you want to delete this {pot ? "pot" : "budget"}? This
          action cannot be undone.
        </div>
        <div className="flex gap-6 flex-col">
          <button
            onClick={handleDelete}
            className="flex justify-center items-center bg-[#BE6C49] text-white text-3xl font-semibold p-6 rounded-xl"
          >
            Yes, Confirm
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            className="flex justify-center items-center text-gray-500 text-3xl px-6 rounded-xl"
          >
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
