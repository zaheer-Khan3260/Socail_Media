import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_SERVER_URL, // Use environment variable for the base URL
  withCredentials: true // Enable sending cookies with requests
});

export default api;