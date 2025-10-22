import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await API.post("/auth/login", { email, password });
      setMessage(`✅ Welcome back, ${res.data.user?.name || "User"}!`);
    } catch (err) {
      setMessage("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "80px" },
  form: { display: "inline-block", textAlign: "left" },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
