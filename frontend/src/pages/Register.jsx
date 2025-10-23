import React, { useState } from "react";
import axios from "axios";

const Register = ({ goToDashboard }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const BACKEND_URL = "https://smart-task-manager-jqlk.onrender.com";

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/register`, {
        name,
        email,
        password,
      });
      if (res.status === 201 || res.status === 200) {
        // Save token from backend
        localStorage.setItem("token", res.data.token);
        goToDashboard();
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "5px" }}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "5px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px" }}
      />
      <br />
      <button onClick={handleRegister} style={{ marginTop: "10px" }}>
        Register
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
