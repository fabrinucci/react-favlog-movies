import type { MoviesResult } from '@/interfaces';
import { MoviesCard } from './';

interface Props {
  popularMovies: MoviesResult[];
  topRatedMovies: MoviesResult[];
}

export const Main = ({ popularMovies, topRatedMovies }: Props) => {
  return (
    <main className='bg-[#13114b] px-4 py-5 text-white sm:px-8 md:px-16'>
      <MoviesCard movies={popularMovies} moviesTitle='Top Movies Today' />
      <MoviesCard movies={topRatedMovies} moviesTitle='Top Rated Movies' />
    </main>
  );
};
