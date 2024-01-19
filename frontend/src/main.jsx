import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store,persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, Bounce } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <App />
    <ToastContainer
      theme="dark"
      autoClose={2000}
      closeOnClick={true}
      pauseOnHover={false}
      transition={Bounce}
    />
  </Provider>
  </PersistGate>
);
