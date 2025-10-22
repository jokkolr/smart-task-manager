import axios from 'axios';

// 👇 Replace this URL with your Render backend URL after deployment
const API = axios.create({
  baseURL: 'https://smart-task-manager-backend.onrender.com',
});

export default API;
