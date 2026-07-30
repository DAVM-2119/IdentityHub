import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <GoogleOAuthProvider clientId={googleClientId}>

      <BrowserRouter>

        <AuthProvider>

          <ThemeProvider>

            <App />

            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 2500,
              }}
            />

          </ThemeProvider>

        </AuthProvider>

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>

);