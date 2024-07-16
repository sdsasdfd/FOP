import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { toggleSidebar } = toggleSlice.actions;

const toggleReducer = toggleSlice.reducer;
export default toggleReducer;
