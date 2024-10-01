import axios from 'axios';
import { env } from '@/config';

export const moviesApi = axios.create({
  baseURL: env.API_URL,
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: env.API_KEY,
  },
});
