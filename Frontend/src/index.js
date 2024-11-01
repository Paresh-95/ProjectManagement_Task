import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <AuthProvider>
        <TaskProvider>
          <App />
          <Toaster position="bottom-center" reverseOrder={false} />
        </TaskProvider>
      </AuthProvider>
    </UserProvider>
  </BrowserRouter>
);
