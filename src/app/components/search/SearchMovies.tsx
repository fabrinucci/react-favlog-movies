'use client';

import { useSearchParams } from 'next/navigation';
import type { MoviesResult } from '@/interfaces';
import { SearchMovieCard } from './SearchMovieCard';

interface Props {
  movies: MoviesResult[];
}

export const SearchMovies = ({ movies }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <section className='pt-[120px] sm:pt-[80px]'>
      <div className='p-6 md:p-8'>
        <h2 className='mb-6 text-2xl'>
          {movies?.length! > 0
            ? `Results about: "${query}"`
            : `There are no movies that matched your query "${query}"`}
        </h2>
        <ul className='grid grid-cols-2 gap-6'>
          {movies?.map((movie) => (
            <SearchMovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </section>
  );
};
