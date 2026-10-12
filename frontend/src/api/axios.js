import axios from 'axios';
import demoAdapter from './demo';

export const DEMO_MODE = process.env.REACT_APP_DEMO === 'true';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  ...(DEMO_MODE ? { adapter: demoAdapter } : {})
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
