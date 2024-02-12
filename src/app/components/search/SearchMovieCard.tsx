import Image from 'next/image';
import Link from 'next/link';
import { MoviesResult } from '@/interfaces';
import { transformToKebabCase } from '@/utils';

interface Props {
  movie: MoviesResult;
}

export const SearchMovieCard = ({ movie }: Props) => {
  const MOVIE_PATH = 'https://image.tmdb.org/t/p/w300';
  const MOVIE_NOT_FOUND = '/assets/movieNotFound.svg';

  const movieTitle = transformToKebabCase(movie.title);

  return (
    <li className='mb-4' key={movie.id}>
      <div className='flex animate-fadeIn flex-col items-center gap-4 sm:flex-row sm:items-start'>
        <Link href={`/movie/${movie.id}-${movieTitle}`}>
          <figure className='h-40 w-28 rounded-sm bg-purple-400'>
            <Image
              className='object-fit h-full w-full rounded-sm'
              src={
                movie.poster_path
                  ? `${MOVIE_PATH}${movie.poster_path}`
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
            <Link href={`/movie/${movie.id}-${movieTitle}`}>
              <h3 className='text-center font-semibold transition-colors duration-200 sm:text-start md:inline md:hover:text-violet-300'>
                {movie.title}
              </h3>
            </Link>
          </div>
          <p className='text-center text-sm text-gray-300 sm:text-start'>
            {movie.release_date}
          </p>
          <p className='hidden text-justify text-sm leading-7 md:block md:w-[90%]'>
            {movie.overview.length > 150
              ? `${movie.overview.slice(0, 150)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </li>
  );
};
