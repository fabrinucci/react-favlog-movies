'use client';

import { useMovies } from '@/hooks';
import { MoviesCard } from './';

export const Main = () => {
  const { movies: popularMovies, loading: popularLoading } =
    useMovies('popular');

  const { movies: topRatedMovies, loading: topRatedLoading } =
    useMovies('top_rated');

  return (
    <main className='bg-[#13114b] px-4 py-5 text-white sm:px-8 md:px-16'>
      <MoviesCard
        movies={popularMovies}
        moviesTitle='Top Movies Today'
        loading={popularLoading}
      />
      <MoviesCard
        movies={topRatedMovies}
        moviesTitle='Top Rated Movies'
        loading={topRatedLoading}
      />
    </main>
  );
};
