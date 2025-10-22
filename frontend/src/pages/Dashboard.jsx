import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  // Your Render backend URL
  const BACKEND_URL = "https://smart-task-manager-jqlk.onrender.com";

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/tasks/`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📋 Dashboard</h1>

      {/* Add new task */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading tasks...</p>}

      {/* Tasks Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Task</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No tasks available
              </td>
            </tr>
          )}
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{task.id}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{task.title}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
