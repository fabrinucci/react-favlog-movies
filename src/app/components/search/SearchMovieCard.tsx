import Image from 'next/image';
import Link from 'next/link';
import type { MoviesResult } from '@/interfaces';
import { transformToSlug } from '@/utils';
import { config } from '@/config';

interface Props {
  movie: MoviesResult;
}

export const SearchMovieCard = ({ movie }: Props) => {
  const { MOVIE_NOT_FOUND, MOVIE_PATH_SMALL } = config;

  const movieTitle = transformToSlug(movie.title);

  return (
    <li className='mb-4' key={movie.id}>
      <div className='flex animate-fadeIn flex-col items-center gap-4 sm:flex-row sm:items-start'>
        <Link
          data-testid='SearchMovieCard-img-link'
          href={`/movie/${movie.id}-${movieTitle}`}
        >
          <figure className='h-40 w-28 rounded-sm bg-purple-400'>
            <Image
              data-testid='SearchMovieCard-img'
              className='object-fit h-full w-full rounded-sm'
              src={
                movie.poster_path
                  ? `${MOVIE_PATH_SMALL}${movie.poster_path}`
                  : MOVIE_NOT_FOUND
              }
              alt={movie.title}
              height={300}
              width={300}
            />
          </figure>
        </Link>
        <div className='flex flex-col gap-2'>
          <div>
            <Link
              data-testid='SearchMovieCard-title-link'
              href={`/movie/${movie.id}-${movieTitle}`}
            >
              <h3
                data-testid='SearchMovieCard-title'
                className='text-center font-semibold transition-colors duration-200 sm:text-start md:inline md:hover:text-violet-300'
              >
                {movie.title}
              </h3>
            </Link>
          </div>
          <p
            data-testid='SearchMovieCard-release'
            className='text-center text-sm text-gray-300 sm:text-start'
          >
            {movie.release_date}
          </p>
          <p
            data-testid='SearchMovieCard-overview'
            className='hidden text-justify text-sm leading-7 md:block md:w-[90%]'
          >
            {movie.overview.length > 150
              ? `${movie.overview.slice(0, 150)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </li>
  );
};
