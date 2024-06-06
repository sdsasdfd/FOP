import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    showSidebar: (state) => {
      state.toggle = true;
    },
    hiddenSidebar: (state) => {
      state.toggle = false;
    },
  },
});

export const { hiddenSidebar, showSidebar } = toggleSlice.actions;

export default toggleSlice.reducer;
