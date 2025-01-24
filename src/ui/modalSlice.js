// src/features/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isAddOpen: false,
    isWithdrawOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    isAddPotOpen: false,
    isEditPotOpen: false,
    isEditBudgetOpen: false,
    isAddBudgetOpen: false,
    isAddTransactionOpen: false,
    editItem: null,
    content: null,
    value: "",
  },

  reducers: {
    openAddModal: (state, action) => {
      state.isAddOpen = true;
      state.content = action.payload;
      state.value = "";
    },
    openWithdrawModal: (state, action) => {
      state.isWithdrawOpen = true;
      state.content = action.payload;
      state.value = "";
    },
    closeModal: (state) => {
      state.isAddOpen = false;
      state.isWithdrawOpen = false;
      state.isEditOpen = false;
      state.isEditPotOpen = false;
      state.isEditBudgetOpen = false;
      state.isDeleteOpen = false;
      state.isAddPotOpen = false;
      state.isAddBudgetOpen = false;
      state.isAddTransactionOpen = false;
      state.content = null;
    },
    openEditModal: (state, action) => {
      state.isEditOpen = true;
      state.editItem = action.payload.item; // Set the specific item being edited
    },
    openEditPotModal: (state, action) => {
      state.isEditPotOpen = true;
      state.editItem = action.payload.item; // Set the specific item being edited
    },
    openEditBudgetModal: (state, action) => {
      state.isEditBudgetOpen = true;
      state.editItem = action.payload.item; // Set the specific item being edited
    },

    openDeleteModal: (state) => {
      state.isDeleteOpen = true;
    },
    openAddPotModal: (state) => {
      state.isAddPotOpen = true;
    },
    openAddBudgetModal: (state) => {
      state.isAddBudgetOpen = true;
    },
    openAddTransaction: (state) => {
      state.isAddTransactionOpen = true;
    },

    setValue: (state, action) => {
      state.value = action.payload;
      console.log("Set value: ", state.value);
    },
  },
});

export const {
  openAddModal,
  openWithdrawModal,
  closeModal,
  setValue,
  openEditModal,
  openDeleteModal,
  openAddPotModal,
  openEditPotModal,
  openAddBudgetModal,
  openEditBudgetModal,
  openAddTransaction,
} = modalSlice.actions;

export default modalSlice.reducer;
