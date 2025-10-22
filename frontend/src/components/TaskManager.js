import React, { useState, useEffect } from 'react';
import API from '../api';

function TaskManager({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post('/tasks', form);
    setForm({ title: '', description: '' });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="card">
      <h3>Your Tasks</h3>
      <form onSubmit={createTask}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong>: {t.description}
          </li>
        ))}
      </ul>

      <button className="logout" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default TaskManager;
