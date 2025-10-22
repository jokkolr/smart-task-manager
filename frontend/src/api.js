import axios from 'axios';

// change URL to match your backend (e.g., localhost:3000 or render.com)
const API = axios.create({ baseURL: 'http://localhost:3000' });

// Automatically add token to each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
