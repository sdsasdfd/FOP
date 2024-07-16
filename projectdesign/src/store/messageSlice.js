import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

const messageReducer = messageSlice.reducer;
export default messageReducer;
