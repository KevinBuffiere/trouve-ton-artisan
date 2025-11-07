import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey) {
    config.headers['X-API-KEY'] = apiKey;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('[API]', error.response.status, error.response.data);
    } else {
      console.error('[API] Network error', error.message);
    }
    throw error;
  },
);

export default api;
