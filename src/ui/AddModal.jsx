import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { setValue } from "./modalSlice";
import { formatCurrency } from "../utils/helpers";
import { updatePot } from "../Pages/pots/potSlice";

function AddModal() {
  const { isAddOpen, content, value } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  if (content == null) return null;
  const { item } = content;
  const amountLeft = item.target - item.total;

  function handleAdd() {
    dispatch(updatePot({ id: item._id, total: value + item.total }));
    dispatch(closeModal());
    console.log("Pot successfully updated");
  }
  console.log(item._id);
  if (!isAddOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className="bg-white p-16 rounded-[2rem] w-[55rem] h-content flex flex-col gap-12 max-500:w-[45rem]">
        <div className=" flex justify-between items-center">
          <div className="text-5xl font-bold">
            Add to &quot;{item.name}&quot;
          </div>
          <div onClick={() => dispatch(closeModal())} className="text-6xl ">
            &times;
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="text-gray-500 text-2xl">New Amount</div>
          <div className="font-bold text-6xl">
            {formatCurrency(value + item.total)}
          </div>
        </div>
        <div className="flex justify-start items-center rounded-full h-6  bg-[#F8F4F0]">
          <span
            style={{ width: `${(item.total / item.target) * 100}%` }}
            className=" bg-black h-full border-r-[#F8F4F0] border-r-2 rounded-l-full"
          ></span>
          <span
            style={{ width: `${(value / item.target) * 100}%` }}
            className=" bg-green-700 h-full rounded-r-full"
          ></span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-2xl text-green-700 font-bold">
            {(
              (item.total / item.target) * 100 +
              (value / item.target) * 100
            ).toFixed(2)}
            %
          </div>
          <div className=" text-2xl text-gray-500 font-semibold">
            Target of {formatCurrency(item.target)}
          </div>
        </div>

        <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900">
          <span className="text-gray-500 text-2xl ">$</span>
          <input
            onChange={(e) => {
              const enteredValue = Number(e.target.value);
              if (enteredValue <= amountLeft) {
                dispatch(setValue(enteredValue));
              } else {
                dispatch(setValue(amountLeft)); // If value exceeds, set to the max allowed amount
              }
            }}
            value={value}
            max={amountLeft}
            type="number"
            className="w-full foucus: outline-none border-none pr-37 pl-6 py-4 rounded-xl text-2xl"
            placeholder="Enter Amount"
            min={0}
            onKeyDown={(e) =>
              (e.key === "-" || e.key === "e") && e.preventDefault()
            }
          />
        </div>

        <button
          onClick={() => {
            handleAdd();
          }}
          className="flex justify-center items-center bg-black text-white text-3xl font-semibold p-6 rounded-xl"
        >
          Confirm Addition
        </button>
      </div>
    </div>
  );
}

export default AddModal;
