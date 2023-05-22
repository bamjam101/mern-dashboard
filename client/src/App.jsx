import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "./theme";
import { getItemInLocalStorage } from "./utlis";
import Layout from "./pages/Layout";
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Registrant = lazy(() => import("./pages/Registrant"));
const Customers = lazy(() => import("./pages/Customers"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Network = lazy(() => import("./pages/Network"));
const Verification = lazy(() => import("./pages/Verification"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Withdraw = lazy(() => import("./pages/Withdraw"));
const Requests = lazy(() => import("./pages/Requests"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Home = lazy(() => import("./pages/Home"));

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
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
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
