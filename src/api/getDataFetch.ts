import { Categories, MovieCredits, Movie, Movies } from '../interfaces';
import { moviesApi } from '.';

export const getMovies = async (type: string) => {
  const { data } = await moviesApi.get<Movies>(`/movie/${type}`);
  return data.results;
};

export const getMovie = async (id: string) => {
  const { data } = await moviesApi.get<Movie>(`/movie/${id}`);
  return data;
};

export const getMovieInfo = async (id: string, info: string) => {
  const { data } = await moviesApi.get<MovieCredits>(`/movie/${id}/${info}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await moviesApi.get<Categories>('/genre/movie/list');
  return data.genres;
};
