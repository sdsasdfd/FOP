import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  loading: false,
  error: null,
};
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    fetchMessagesStart: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    fetchMessageFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchMessageSuccess: (state, action) => {
      state.chats = action.payload;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { fetchMessageFailure, fetchMessageSuccess, fetchMessagesStart } =
  chatSlice.actions;

const messagesReducer = chatSlice.reducer;
export default messagesReducer;
