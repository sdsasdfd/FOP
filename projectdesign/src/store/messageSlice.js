import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messageSlice.actions;

const messageReducer = messageSlice.reducer;
export default messageReducer;
