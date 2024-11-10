import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://web:8000', // 'web' es el nombre del servicio en docker-compose.
});

export default api;
