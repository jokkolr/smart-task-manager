import React, { useState } from 'react';
import API from '../api';

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      onLogin(res.data.access_token);
      setMsg('✅ Logged in successfully!');
    } catch {
      setMsg('❌ Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Login</h3>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Log In</button>
      <p>{msg}</p>
    </form>
  );
}

export default LoginForm;
