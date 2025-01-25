import axios from 'axios';

const API_URL = 'http://localhost:8200';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
