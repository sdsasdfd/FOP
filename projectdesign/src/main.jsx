import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
        {/* <ToastContainer position="top-center" /> */}
      </React.StrictMode>
    </Provider>
  </PersistGate>
);
