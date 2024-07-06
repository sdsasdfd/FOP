import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatsReducer from "./chatSlice";
import messageReducer from "./messageSlice";

const rootReducer = combineReducers({
  user: userReducer,
  chats: chatsReducer,
  message: messageReducer,
});

const persistConfig = {
  key: "rootClient",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
