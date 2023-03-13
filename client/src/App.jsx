import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Registrant from "./pages/Registrant";
import Customers from "./pages/Customers";
import UserProfile from "./pages/UserProfile";
import Network from "./pages/Network";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { getItemInLocalStorage } from "./utlis";
import Withdraw from "./pages/Withdraw";
import Requests from "./pages/Requests";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";

const ProtectedRoute = ({ children }) => {
  const user = getItemInLocalStorage("TOKEN");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { isLoading, isAdmin } = useSelector((state) => state.global);
  const [routeVisibility, setRouteVisibility] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (isAdmin) {
        setRouteVisibility(true);
      }
    }
  }, [isLoading]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              {setRouteVisibility && (
                <Route path="/" element={<Navigate to="/dashboard" />} />
              )}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="registrants"
                element={
                  <ProtectedRoute>
                    <Registrant />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/users"
                element={
                  <ProtectedRoute>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/network"
                element={
                  <ProtectedRoute>
                    <Network />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/network/:id"
                element={
                  <ProtectedRoute>
                    <Network />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/withdraw"
                element={
                  <ProtectedRoute>
                    <Withdraw />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/requests"
                element={
                  <ProtectedRoute>
                    <Requests />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:id/verify/:token" element={<Verification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user/:id/reset/:token" element={<ResetPassword />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
