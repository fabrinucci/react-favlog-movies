import { useState } from 'react';
import { MoviesResult } from '../interfaces';
import { GiRoundStar } from 'react-icons/gi';

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
              <article className='container-movies'>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className='rounded-sm'
                />
                <div className='info-movies'>
                  <h4 className='mb-1 text-sm font-semibold'>{movie.title}</h4>
                  <div className='mb-2 flex items-center gap-2'>
                    <p className='text-[.65rem] text-zinc-300'>
                      {movie.release_date.split('-')[0]}
                    </p>
                    <div className='flex items-center gap-1'>
                      <GiRoundStar size={10} />
                      <p className='text-[.65rem] text-zinc-300'>
                        {movie.vote_average}
                      </p>
                    </div>
                  </div>
                  <p className='mb-2 text-[.7rem] text-gray-300'>
                    {movie.overview.slice(0, 80)}...
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
