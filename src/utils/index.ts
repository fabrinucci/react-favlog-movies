import { MoviesResult } from '../interfaces';

export const getRandomImage = (movies: MoviesResult[]) => {
  return Math.floor(Math.random() * movies?.length);
};
