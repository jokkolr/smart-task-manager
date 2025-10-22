import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home"); // start at home page

  // Function to render the current page
  const renderPage = () => {
    if (page === "login") return <Login goToDashboard={() => setPage("dashboard")} />;
    if (page === "register") return <Register goToDashboard={() => setPage("dashboard")} />;
    if (page === "dashboard") return <Dashboard />;
    // Default Home Page
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
        </div>
      </div>
    );
  };

  return <div>{renderPage()}</div>;
}
