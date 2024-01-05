import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});
