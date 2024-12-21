import axios from 'axios';
import { config } from '@/config';

export const moviesApi = axios.create({
  baseURL: config.API_URL,
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: config.API_KEY,
  },
});
