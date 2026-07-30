import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Sessions from "./pages/Sessions";
import LoginHistory from "./pages/LoginHistory";
import SecurityAlerts from "./pages/SecurityAlerts";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <Routes>


      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      <Route
        path="/login"
        element={<Login />}
      />



      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />



      <Route
        path="/sessions"
        element={
          <ProtectedRoute>
            <Sessions />
          </ProtectedRoute>
        }
      />



      <Route
        path="/login-history"
        element={
          <ProtectedRoute>
            <LoginHistory />
          </ProtectedRoute>
        }
      />



      <Route
        path="/security-alerts"
        element={
          <ProtectedRoute>
            <SecurityAlerts />
          </ProtectedRoute>
        }
      />


    </Routes>

  );

}


export default App;