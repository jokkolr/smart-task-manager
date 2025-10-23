import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ logout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Your Render backend URL
  const BACKEND_URL = "https://smart-task-manager-jqlk.onrender.com";

  // Check if user is logged in (simple localStorage check)
  const token = localStorage.getItem("token"); // Assume backend sends token on login

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (!token) return; // Only fetch if logged in
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask || !token) return;
    try {
      await axios.post(
        `${BACKEND_URL}/tasks/`,
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Mark task as completed
  const completeTask = async (id) => {
    try {
      await axios.post(
        `${BACKEND_URL}/tasks/complete`,
        { task_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  // Save edited task
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/tasks/${id}`,
        { title: editingTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTaskId(null);
      setEditingTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Please log in to view your tasks</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📋 Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            logout();
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

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

              {/* Task title editable */}
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    style={{ width: "100%", padding: "6px" }}
                  />
                ) : (
                  task.title
                )}
              </td>

              {/* Status */}
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: task.completed ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </td>

              {/* Actions */}
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {!task.completed && editingTaskId !== task.id && (
                  <>
                    <button
                      onClick={() => completeTask(task.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => startEdit(task)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#FFC107",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
                {editingTaskId === task.id && (
                  <button
                    onClick={() => saveEdit(task.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
