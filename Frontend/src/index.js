import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import {  UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <AuthProvider>
        <App />
        <Toaster position="bottom-center" reverseOrder={false} />
      </AuthProvider>
    </UserProvider>
  </BrowserRouter>
);
