import { useState } from 'react';
import { MoviesResult } from '../interfaces';

interface Props {
  movies: MoviesResult[] | undefined;
  moviesTitle: string;
}

export const MoviesCard = ({ movies, moviesTitle }: Props) => {
  const [showAllMovies, setShowAllMovies] = useState(false);
  let moviesSelected;

  if (showAllMovies) {
    moviesSelected = movies?.slice(0, 18);
  } else {
    moviesSelected = movies?.slice(0, 6);
  }

  const onShowMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  return (
    <section>
      <div className='py-5'>
        <div className='mb-5 flex items-center justify-between'>
          <h3 className='text-xl font-semibold md:text-2xl'>{moviesTitle}</h3>
          <button
            onClick={onShowMovies}
            className='rounded-md bg-violet-600 px-4 py-1 font-semibold text-gray-200 md:py-2'
          >
            {showAllMovies ? 'Hide movies' : 'Show all'}
          </button>
        </div>
        <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-4 lg:grid-cols-6 lg:gap-3'>
          {moviesSelected?.map((movie) => (
            <li key={movie.id}>
              <article className='relative'>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className='rounded-sm'
                  />
                </figure>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
