import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <React.StrictMode>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
        <ToastContainer position="top-center" />
      </React.StrictMode>
    </Provider>
  </PersistGate>
);
