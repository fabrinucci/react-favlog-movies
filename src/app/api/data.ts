import type {
  Categories,
  MovieCredits,
  Movie,
  Movies,
  MoviesType,
} from '@/interfaces';
import { moviesApi } from './';

export const getMovies = async (type: MoviesType) => {
  try {
    const { data } = await moviesApi.get<Movies>(`/movie/${type}`);
    return data.results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};

export const getMovie = async (id: string) => {
  try {
    const { data } = await moviesApi.get<Movie>(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie data.');
  }
};

export const getMovieCredits = async (id: string) => {
  try {
    const { data } = await moviesApi.get<MovieCredits>(`/movie/${id}/credits`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie data.');
  }
};

export const getCategories = async () => {
  try {
    const { data } = await moviesApi.get<Categories>('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
};

export const getMoviesBySearch = async (query: string) => {
  try {
    const { data } = await moviesApi.get<Movies>(`search/movie?query=${query}`);
    return data.results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};
