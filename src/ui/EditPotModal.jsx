/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
// Import the closeModal action
import { useState } from "react";
import downArrow from "../../assets/images/icon-caret-down.svg";
import { closeModal } from "./modalSlice";
import { updatePot } from "../Pages/pots/potSlice";

function EditPotModal({ item }) {
  const { isEditPotOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [potName, setPotName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState("Current"); // Default color
  const [selectedColorHex, setSelectedColorHex] = useState(item.theme); // Default color
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const maxLength = 20; // Set the maximum character length
  const charactersLeft = maxLength - potName.length; // Calculate remaining characters

  const colors = [
    { color: "#277C78", name: "Green" },
    { color: "#FFD700", name: "Yellow" },
    { color: "#FF4500", name: "Red" },
    { color: "#1E90FF", name: "Blue" },
    { color: "#800080", name: "Purple" },
    { color: "#FF69B4", name: "Pink" },
    { color: "#A9A9A9", name: "Gray" },
    { color: "#00FFFF", name: "Cyan" },
    { color: "#FF8C00", name: "Orange" },
  ];

  function handleSubmit() {
    const editPot = {
      id: item._id,
      name: potName || item.name,
      theme: selectedColorHex,
      target: targetAmount || item.target,
    };
    // Dispatch the action to add a pot

    dispatch(updatePot(editPot));
    dispatch(closeModal());
    console.log("Pot successfully updated");
  }
  if (!isEditPotOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className="bg-white p-16 rounded-[2rem] w-[55rem] h-content flex flex-col gap-10 max-500:w-[45rem]">
        <div className=" flex justify-between items-center">
          <div className="text-5xl font-bold">
            Edit &quot;{item.name}&quot;Pot
          </div>
          <div onClick={() => dispatch(closeModal())} className="text-6xl ">
            &times;
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-2xl  font-semibold">Pot Name</div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900">
            <input
              onChange={(e) => setPotName(e.target.value)}
              type="text"
              maxLength={20}
              className="w-full foucus: outline-none border-none pr-37 pl-6 py-3 rounded-xl text-2xl"
              placeholder="e.g Rainy Days"
            />
          </div>
          <div className=" w-full text-right text-gray-500 text-xl">
            {charactersLeft} Letters Left
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-2xl font-semibold ">Target</div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900">
            <span className="text-gray-500 text-2xl ">$</span>
            <input
              onChange={(e) => setTargetAmount(e.target.value)}
              type="number"
              className="w-full foucus: outline-none border-none pr-37 pl-6 py-3 rounded-xl text-2xl"
              placeholder="e.g 2000"
              min={0}
              onKeyDown={(e) =>
                (e.key === "-" || e.key === "e") && e.preventDefault()
              }
            />
          </div>
        </div>

        <div className="">
          <div className="text-gray-500 text-2xl font-semibold ">Target</div>
          <div className="flex items-center border rounded-2xl py-3 px-5 border-gray-900 relative">
            <span
              style={{ backgroundColor: selectedColorHex }}
              className=" w-7 h-7 rounded-full flex "
            ></span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-gray-500 flex items-center foucus: outline-none border-none pr-37 pl-6 py-3 rounded-xl text-2xl text-left"
            >
              {selectedColor}
              <img className="ml-auto" src={downArrow} alt="" />
            </button>

            {isDropdownOpen && (
              <div className="h-full space-y-3 text-2xl">
                {isDropdownOpen && (
                  <div className="absolute left-0 top-[6rem]  w-full bg-white rounded-xl   z-10 border-gray-500 border-[1px]  ">
                    <div className="overflow-y-scroll h-[20rem]">
                      {colors.map((color) => (
                        <div
                          key={color.color}
                          onClick={() => {
                            setSelectedColor(color.name);
                            setSelectedColorHex(color.color);
                            setIsDropdownOpen(!isDropdownOpen);
                          }}
                          className="hover:bg-gray-200 pl-6 py-4 flex gap-5 cursor-pointer"
                        >
                          <span
                            className="w-7 h-7 rounded-full"
                            style={{ backgroundColor: color.color }}
                          ></span>
                          {color.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            handleSubmit();
          }}
          className="flex justify-center items-center bg-black text-white text-3xl font-semibold p-6 rounded-xl"
        >
          Confirm Addition
        </button>
      </div>
    </div>
  );
}

export default EditPotModal;
