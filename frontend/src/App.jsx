import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("home");
  };

  const renderPage = () => {
    const token = localStorage.getItem("token");

    if (token && page === "dashboard") {
      return <Dashboard logout={handleLogout} />;
    }

    if (page === "login") return <Login goToDashboard={() => setPage("dashboard")} />;
    if (page === "register") return <Register goToDashboard={() => setPage("dashboard")} />;

    // Default Home page
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🧠 Smart Task Manager</h1>
        <p>Developed by Jacob Okoth</p>
        <p>Frontend connected successfully 🚀</p>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setPage("login")} style={{ marginRight: "10px" }}>
            Login
          </button>
          <button onClick={() => setPage("register")}>Register</button>
          {token && (
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderPage()}</div>;
}
