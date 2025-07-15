import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequestList from "./pages/request/RequestList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import Forms from "./Forms";
import Statistics from "./pages/Statistics";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Maintenances from "./pages/Maintenances";
import Login from "./pages/Login";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected layout */}
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="analytics/reports" element={<Report />} />
          <Route path="analytics/statistics" element={<Statistics />} />
          <Route path="requests" element={<Maintenances />} />
          <Route path="requests/index" element={<RequestList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
