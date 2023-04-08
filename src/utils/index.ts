import { Movies, MoviesResult } from '../interfaces';

export const getRandomImage = (movies: Movies) => {
  Math.floor(Math.random() * movies?.results.length);
};
