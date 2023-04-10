import { Categories, Movies } from '../interfaces';
import { moviesApi } from './';

export const getMovies = async (type: string) => {
  const { data } = await moviesApi.get<Movies>(`/movie/${type}`);
  return data.results;
};

export const getCategories = async () => {
  const { data } = await moviesApi.get<Categories>('/genre/movie/list');
  return data.genres;
};
