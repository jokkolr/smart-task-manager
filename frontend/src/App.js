import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import TaskManager from './components/TaskManager';
import './styles.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="container">
      <h1>🧠 Smart Task Manager</h1>
      {!token ? (
        <>
          <RegisterForm />
          <LoginForm onLogin={handleLogin} />
        </>
      ) : (
        <TaskManager onLogout={handleLogout} />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
