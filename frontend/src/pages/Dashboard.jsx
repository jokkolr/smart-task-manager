import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Replace with your Render backend URL
  const BACKEND_URL = "https://<your-backend>.onrender.com";

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/tasks/`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask) return;
    try {
      await axios.post(`${BACKEND_URL}/tasks/`, { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Mark task as completed
  const completeTask = async (id) => {
    try {
      await axios.post(`${BACKEND_URL}/tasks/complete`, { task_id: id });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "✅" : "❌"}
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
