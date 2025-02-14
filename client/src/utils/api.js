// src/utils/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://flickbase-mu.vercel.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;