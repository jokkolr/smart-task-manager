import axios from 'axios';

// ✅ Backend URL (from Render)
const API = axios.create({
  baseURL: 'https://smart-task-manager-jqlk.onrender.com',
});

export default API;
