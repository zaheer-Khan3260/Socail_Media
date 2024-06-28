import axios from 'axios';

console.log('Backend server url:', process.env.REACT_APP_BACKEND_SERVER_URL);
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL, 
  withCredentials: true 
});

export default api;