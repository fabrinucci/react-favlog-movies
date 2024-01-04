import { MoviesResult } from '../interfaces';

export const getRandomImage = (movies: MoviesResult[]) => {
  return Math.floor(Math.random() * movies?.length);
};

export const getYear = (movieRelease: string) => {
  return movieRelease.split('-')[0];
};
