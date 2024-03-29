import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginContextProvider from "./context/LoginContextProvider";
import CartContextProvider from "./context/CartContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);

