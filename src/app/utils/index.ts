import { MoviesResult } from '../interfaces';

export const getRandomImage = (movies: MoviesResult[]) => {
  return Math.floor(Math.random() * movies?.length);
};

export const getYear = (movieRelease: string) => {
  return movieRelease.split('-')[0];
};

export const validatedPage = (page: number) => {
  if (isNaN(page)) return 1;
  if (page > 500) return 1;
  return page;
};
