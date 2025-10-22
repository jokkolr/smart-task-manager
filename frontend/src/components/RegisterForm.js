import React, { useState } from 'react';
import API from '../api';

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      setMsg('✅ Registration successful! You can log in now.');
    } catch {
      setMsg('❌ Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Register</h3>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      <p>{msg}</p>
    </form>
  );
}

export default RegisterForm;
