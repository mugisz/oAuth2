import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/screens/HomePage/HomePage";
import ActivationPage from "./components/screens/ActivationPage/ActivationPage";
import AccountPage from "./components/screens/AccountPage/AccountPage";
import NavBar from "./components/Navbar/Navbar";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("jwtSecret");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/activation"
          element={
            <PrivateRoute>
              <ActivationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
